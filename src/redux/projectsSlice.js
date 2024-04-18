import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    projects: [],
}

const projectsDetails = createSlice({
    name: "projects",
    initialState,
    reducers: {
        getAllprojects: function (state, action) {
            state.projects = action.payload;
        }
        
    }
})

export const { getAllprojects } = projectsDetails.actions;
export default projectsDetails.reducer;