import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    expenses: [],
    income: [],
}

const transactions = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        getAllexpenses: function (state, action) {
            state.expenses = action.payload;
        },
        getAllincome: function (state, action) {
            state.income = action.payload;
        },
        
    }
})

export const { getAllexpenses, getAllincome } = transactions.actions;
export default transactions.reducer;