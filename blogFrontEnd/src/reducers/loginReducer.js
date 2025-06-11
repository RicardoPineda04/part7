import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storage from "../services/storage"

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const { setUser } = loginSlice.actions
export const loginUser = (user) => {
    return async dispatch => {
        // const user = await loginService.login(credentials)
        storage.saveUser(user)
        dispatch(setUser(user))
    }
}
export const setUserStorage = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}

export default loginSlice.reducer