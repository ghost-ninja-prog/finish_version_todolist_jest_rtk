import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type TFavoritesTodo = {
    favorite: boolean,
    title: string,
    id: number,
    userId: string
}

type TInitialState = {
    todos: TFavoritesTodo[],
    message: null | string
}



const initialState: TInitialState = {
    todos: [],
    message: null,
}


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<TFavoritesTodo>) => {
            const idx = state.todos.findIndex(todo => todo.id === action.payload.id)
            console.log(idx)
            if(idx !== -1) {
                return
            }
            state.todos = state.todos.concat([{...action.payload}])
        },
        deleteFromFavorites: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)        
        }
    }
})


export const { addToFavorites, deleteFromFavorites } = favoritesSlice.actions

export const favoritesReducer = favoritesSlice.reducer