import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export type TTodoType = {
    title: string,
    id: number,
    completed: boolean,
    userId: string,
}

export type TCreatedTodo = {
    title: string,
    userId: string,
    completed: boolean,
}

export type TTodosStateType = {
    todos: TTodoType[],
    loading: boolean,
    error: string | null | undefined,
}


export const URL = 'https://jsonplaceholder.typicode.com/todos/'



export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        const response = await fetch(`${URL}?_limit=20`)
        
        if (!response.ok) {
            return rejectWithValue('Can\'t fetch todo. Server error!!!')
        }
        return response.json()
    }
)

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (todo: TCreatedTodo, { rejectWithValue }) => {
        const response = await fetch(`${URL}`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        if(!response.ok) {
            return rejectWithValue('Error created todo')
        }
        return response.json()
    }
)

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async (todo: TTodoType, { rejectWithValue }) =>{
        const response = await fetch(`${URL}${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({...todo, completed: !todo.completed}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        if(!response.ok) {
            return rejectWithValue('error server !!!!!')
        }
        return response.json()
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
        const response = await fetch(`${URL}${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            return rejectWithValue('Can\'t dalete todo. Server error!!!')
        }
        return id
    }
)

export const editTodo = createAsyncThunk(
    'todos/editTodo',
    async (todo: TTodoType, { rejectWithValue }) => {
        const response = await fetch(`${URL}${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({...todo}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        if(!response.ok) {
            // return rejectWithValue('error server !!!!!')
            throw new Error('Error server!!!! (((')
        }
        return response.json()
    } 
)





const initialState: TTodosStateType = {
    todos: [],
    loading: false,
    error: null,
}

const asyncTodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearErrorMessage: (state) => {
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
                state.loading = false
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)                
            })
            .addCase(toggleTodo.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)                
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)                
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.todos = [{...action.payload}, ...state.todos]
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.error = action.error.message
            })
    },
})

export const { clearErrorMessage } = asyncTodoSlice.actions

export const asyncTodoReducer = asyncTodoSlice.reducer