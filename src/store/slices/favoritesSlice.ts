import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TTodoType } from "./todoSlice"


type TInitialState = {
    todosFavorite: TTodoType[],
    message: null | string
}



const initialState: TInitialState = {
    todosFavorite: [],
    message: null,
}


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<TTodoType>) => {
            state.todosFavorite = [{...action.payload}].concat(state.todosFavorite)
        },
        deleteFromFavorites: (state, action: PayloadAction<number>) => {
            state.todosFavorite = state.todosFavorite.filter(todo => todo.id !== action.payload)        
        },
        editInFavorites: (state, action: PayloadAction<{id: number, title: string}>) => {
            state.todosFavorite = state.todosFavorite.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)
        },
        changeStatusInFavorites: (state, action: PayloadAction<number>) => {
            state.todosFavorite = state.todosFavorite.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
        }
    }
})


export const { addToFavorites, deleteFromFavorites, editInFavorites, changeStatusInFavorites } = favoritesSlice.actions

export const favoritesReducer = favoritesSlice.reducer