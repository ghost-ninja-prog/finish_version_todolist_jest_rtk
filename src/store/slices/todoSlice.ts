import {  createSlice, PayloadAction } from "@reduxjs/toolkit";


export type TTodoType = {
    title: string,
    id: number,
    completed: boolean,
    userId: number,
}

export type TCategoriesType = 'all' | 'completed' | 'active' | 'favorite'

export type TTodosStateType = {
    data: TTodoType[],
    loading: boolean,
    error: string | null | undefined,
    categories: TCategoriesType
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
    data: todos,
    loading: false,
    error: null,
    categories: 'all',
}

const asyncTodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearErrorMessage: (state) => {
            state.error = null
        },
        changeCategiries: (state, action: PayloadAction<TCategoriesType>) => {
            state.categories = action.payload
        },
        changeStatus: (state, action: PayloadAction<number>) => {
            state.data = state.data.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
        },
        deleteElem: (state, action) => {
            state.data = state.data.filter(todo => todo.id !== action.payload)
        },
        addTodo: (state, action: PayloadAction<TTodoType>) => {
            state.data = [{...action.payload}, ...state.data]
        }
    }
})

export const { clearErrorMessage, changeCategiries, changeStatus, deleteElem, addTodo } = asyncTodoSlice.actions

export const asyncTodoReducer = asyncTodoSlice.reducer