import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () =>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data
})

const userSlice = createSlice({
    name:"users",
    initialStates:{
        user: [],
        status:'idle',
        error:null
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchUsers.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(fetchUsers.fulfilled, (state, action) =>{
            state.status = "succeeded"
            state.user= action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) =>{
            state.status = "failed"
            state.error= action.error.message
        })
    }
})

export default userSlice.reducer