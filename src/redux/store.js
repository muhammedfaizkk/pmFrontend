import { configureStore } from "@reduxjs/toolkit";
import usersList from "./userSlice";
import projectsDetails from "./projectsSlice";
import transactions from "./transactions";





const store = configureStore({
    reducer: {
        users: usersList,
        allProjects:projectsDetails,
        transactions:transactions
    }
})

export default store