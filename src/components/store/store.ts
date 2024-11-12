import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { asyncTodoReducer } from "./slices/todoSlice";


const rootReducer = combineReducers({
    asyncTodos: asyncTodoReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type TypeRootState = ReturnType<typeof store.getState>

export type TypeAppDispatch = typeof store.dispatch