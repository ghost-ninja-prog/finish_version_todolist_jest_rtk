import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export type TTodoType = {
    title: string,
    id: number,
    completed: boolean,
    userId: number,
    favotite?: boolean,
}

export type TCategoriesType = 'all' | 'completed' | 'active' | 'favorite'

export type TTodosStateType = {
    todos: TTodoType[],
    loading: boolean,
    startElem: number,
    error: string | null | undefined,
    message: string | null | undefined,
    categories: TCategoriesType
}

export type TEditTodoType = {
    id: number,
    title: string,
}

export type TCreatedTodo = {
    title: string,
    completed: boolean,
    userId: number,
}

export const URL = 'https://jsonplaceholder.typicode.com/todos'


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (page: number = 0, { rejectWithValue }) => {
        const response = await axios.get(`${URL}?_limit=15&_start=${page}`) 
        if (response.status !== 200) {
            return rejectWithValue('Can\'t fetch todo. Server error!!!')
        }
        return response.data
    }
)

export const createAsyncTodo = createAsyncThunk(
    'todos/createTodo',
    async (todo: TCreatedTodo, { rejectWithValue }) => {
        const response = await axios.post(`${URL}`, todo)
        if(response.status !== 201) {
            return rejectWithValue('Error created todo')
        }
        console.log(response.data)
        return response.data
    }
)

export const toggleAsyncTodo = createAsyncThunk(
    'todos/toggleTodo',
    async (todo: TTodoType, { rejectWithValue }) =>{
        const response = await axios.patch(`${URL}/${todo.id}`, 
            {completed: !todo.completed})
        if(response.status !== 200) {
            return rejectWithValue('error server !!!!!')
        }
        return response.data
    }
)

export const deleteAsyncTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
        const response = await axios.delete(`${URL}/${id}`)

        if (response.status !== 200) {
            return rejectWithValue('Can\'t dalete todo. Server error!!!')
        }
        return id
    }
)

export const editAsyncTodo = createAsyncThunk(
    'todos/editTodo',
    async (todo: TTodoType, { rejectWithValue }) => {
        const response = await axios.put(`${URL}/${todo.id}`, {
            id: todo.id,
            title: todo.title,
            userId: todo.userId,
            completed: todo.completed
        })
        if(response.status !== 200) {
            return rejectWithValue('error server !!!!!')
        }
        return response.data
    } 
)


const initialState: TTodosStateType = {
    todos: [],
    loading: false,
    startElem: 0,
    error: null,
    message: null,
    categories: 'all',
}

const asyncTodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        editMessage: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload
        },
        changeCategories: (state, action: PayloadAction<TCategoriesType>) => {
            state.categories = action.payload
        },
        addTodo: (state, action: PayloadAction<TTodoType>) => {
            state.todos = [{...action.payload}, ...state.todos]
        },
        editTodo: (state, action: PayloadAction<TEditTodoType>) => {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)
        },
        changeStatus: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
        },
        deleteElem: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        changeStartElem: (state) => {
            state.startElem = state.startElem + 5
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = state.todos.concat(action.payload)
                state.startElem = state.startElem + 5
                state.loading = false
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
            .addCase(toggleAsyncTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)                
            })
            .addCase(toggleAsyncTodo.rejected, (state, action) => {
                state.message = action.error.message
            })
            .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)                
            })
            .addCase(deleteAsyncTodo.rejected, (state, action) => {
                state.message = action.error.message
            })
            .addCase(editAsyncTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)                
            })
            .addCase(editAsyncTodo.rejected, (state, action) => {
                state.message = action.error.message
            })
            .addCase(createAsyncTodo.fulfilled, (state, action) => {
                state.todos = [{...action.payload}, ...state.todos]
            })
            .addCase(createAsyncTodo.rejected, (state, action) => {
                state.message = action.error.message
            })
    },
})

export const { editMessage, changeCategories, changeStatus, deleteElem, addTodo, editTodo, changeStartElem } = asyncTodoSlice.actions

export const asyncTodoReducer = asyncTodoSlice.reducer