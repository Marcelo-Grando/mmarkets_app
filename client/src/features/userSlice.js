import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        loadUser: (state, action) => {
            return action.payload
        }
    }
})

export const {loadUser} = userSlice.actions
export default userSlice.reducer