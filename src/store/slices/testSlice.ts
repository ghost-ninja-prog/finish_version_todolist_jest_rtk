import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddCardType = {
    id: number,
    text: string,
    description: string
}


const initialState = {
    data: [
        {
            id: 1,
            text: 'text',
            description: 'description'
        },
        {
            id: 2,
            text: 'text2',
            description: 'description2'
        }
    ]
}



const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<AddCardType>) => {
            state.data = [{ ...action.payload }, ...state.data]
        },
        removeCard: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(c => c.id !== action.payload)
        },
    }
})

export const { addCard, removeCard } = testSlice.actions

export const testReducer = testSlice.reducer