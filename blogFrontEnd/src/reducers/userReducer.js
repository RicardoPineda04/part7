import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action){
            return action.payload
        }
    }
})

export const { setUsers } = userSlice.actions
export const getAllUsers = (users) => {
    return async dispatch => {    
        // const blogs = await blogService.getAll()
        dispatch(setUsers(users))
    }
}
export default userSlice.reducer