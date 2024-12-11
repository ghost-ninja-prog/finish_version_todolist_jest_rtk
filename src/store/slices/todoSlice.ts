import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TTodoType = {
    title: string,
    id: number,
    completed: boolean,
    userId: number,
    favorite?: boolean,
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


export const fetchTodos = createAsyncThunk<TTodoType[], number, {rejectValue: string}>(
    'todos/fetchTodos',
    async (page = 0, { rejectWithValue }) => {
        try{
            const res = await fetch(`${URL}?_limit=15&_start=${page}`)
            if(!res.ok) {
                throw new Error('Error load data!!!!')
            }
            return await res.json()
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message)
            }
        }
    }
)

export const createAsyncTodo = createAsyncThunk<TTodoType, TCreatedTodo, { rejectValue: string }>(
    'todos/createAsyncTodo',
    async (todo: TCreatedTodo, { rejectWithValue }) => {
        try{
            const res = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            if(!res.ok) {
                throw new Error('Error creation todos')
            }
            return await res.json()
        } catch (e) {
            if(e instanceof Error) {
                return rejectWithValue(e.message)
            }
        }
    }
)

export const toggleAsyncTodo = createAsyncThunk<TTodoType, TTodoType, {rejectValue: string}>(
    'todos/toggleTodo',
    async (todo, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${URL}/${todo.id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: !todo.completed
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }
            )
            if(!res.ok) {
                throw new Error('Error toggle todo')
            }
            return await res.json()
        } catch (e) {
            if(e instanceof Error) {
                return rejectWithValue(e.message)
            }
        }
    }
)

export const deleteAsyncTodo = createAsyncThunk<number, number,{rejectValue: string}>(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try{
            const response = await fetch(`${URL}/${id}`, {
                method: 'DELETE'
            })
            if(!response.ok) {
                throw new Error('Error delete todo')
            }
            response.json = () => Promise.resolve(id)
            return response.json()
        } catch (e) {
            if(e instanceof Error) {
                return rejectWithValue(e.message)
            }
        }
    }
)

export const editAsyncTodo = createAsyncThunk<TTodoType, TTodoType, { rejectValue: string }>(
    'todos/editTodo',
    async (todo: TTodoType, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${URL}/${todo.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(todo),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }
            )
            if(!res.ok) {
                throw new Error('Error edit todo')
            }
            return await res.json()
        } catch (e) {
            if(e instanceof Error) {
                return rejectWithValue(e.message)
            }
        }
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
                state.todos = [{id: 1, title: 'error', completed: false, userId: 1}]
                state.message = action.payload
            })
            .addCase(toggleAsyncTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)                
            })
            .addCase(toggleAsyncTodo.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            })
            .addCase(deleteAsyncTodo.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(editAsyncTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)                
            })
            .addCase(editAsyncTodo.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(createAsyncTodo.fulfilled, (state, action) => {
                state.todos = [{...action.payload}, ...state.todos]
            })
            .addCase(createAsyncTodo.rejected, (state, action) => {
                state.message = action.payload
            })
    },
})

export const { editMessage, changeCategories, changeStatus, deleteElem, addTodo, editTodo, changeStartElem } = asyncTodoSlice.actions

export const asyncTodoReducer = asyncTodoSlice.reducer