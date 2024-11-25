import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'reduxjs-toolkit-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "reduxjs-toolkit-persist";

import { asyncTodoReducer } from "./slices/todoSlice";
import { favoritesReducer } from "./slices/favoritesSlice";


const rootReducer = combineReducers({
    asyncTodos: asyncTodoReducer,
    favorites: favoritesReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorites']
}

const _persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})



export type TypeRootState = ReturnType<typeof rootReducer>

export type TypeAppDispatch = typeof store.dispatch

export const persistor = persistStore(store)