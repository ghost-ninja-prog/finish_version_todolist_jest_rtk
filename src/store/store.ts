import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { asyncTodoReducer } from "./slices/todoSlice";
import { favoritesReducer } from "./slices/favoritesSlice";
import { testReducer } from "./slices/testSlice";


const rootReducer = combineReducers({
    asyncTodos: asyncTodoReducer,
    favorites: favoritesReducer,
    testStore: testReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type TypeRootState = ReturnType<typeof store.getState>

export type TypeAppDispatch = typeof store.dispatch