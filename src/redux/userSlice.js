import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userAuth: false,
    sidebarStatus: true,
    drStatus:'Expense',
    dept:'Dept'
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userAuth: function (state, action) {
            state.user = action.payload;
            state.userAuth = true;
        },
        logoutUser: function (state, action) {
            state.userAuth = action.payload;
        },
        navControl: function (state, action) {
            state.sidebarStatus = action.payload; // Update sidebarStatus
        },
        // Add sidebarStatus reducer
        sidebarStatus: function (state, action) {
            state.sidebarStatus = action.payload;
        },
        dropDownacounts: function (state, action) {
            state.drStatus = action.payload;
        },
        Deptstatus: function (state, action) {
            state.dept = action.payload;
        }


    }
});

export const { userAuth, logoutUser, navControl, sidebarStatus ,dropDownacounts,Deptstatus} = userSlice.actions;
export default userSlice.reducer;
