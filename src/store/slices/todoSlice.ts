import {  createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    error: string | null | undefined,
    message: string | null,
    categories: TCategoriesType
}

export type TEditTodoType = {
    id: number,
    title: string,
}


const todos = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false
    },
    {
      userId: 1,
      id: 4,
      title: "et porro tempora",
      completed: true
    },
    {
      userId: 1,
      id: 5,
      title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
      completed: false
    }
  ]




const initialState: TTodosStateType = {
    todos,
    loading: false,
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
    }
})

export const { editMessage, changeCategories, changeStatus, deleteElem, addTodo, editTodo } = asyncTodoSlice.actions

export const asyncTodoReducer = asyncTodoSlice.reducer