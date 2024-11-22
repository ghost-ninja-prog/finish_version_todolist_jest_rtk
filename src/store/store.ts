import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { asyncTodoReducer } from "./slices/todoSlice";
import { favoritesReducer } from "./slices/favoritesSlice";


const rootReducer = combineReducers({
    asyncTodos: asyncTodoReducer,
    favorites: favoritesReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type TypeRootState = ReturnType<typeof store.getState>

export type TypeAppDispatch = typeof store.dispatch