import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setVote(state, action){
            const id = action.payload.id
            const blogToVote = state.find(blog => blog.id === id)
            const updatedBlog = {
                ...blogToVote,
                likes: blogToVote.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog: updatedBlog)
        },
        setBlogs(state, action){
            return action.payload
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        removeBlog(state, action){
            return state.filter(blog => blog.id !== action.payload.id)            
        }
    }
})

export const { setBlogs, setVote, appendBlog, removeBlog } = blogSlice.actions
export const initializeBlogs = (blogs) => {
    return async dispatch => {    
        // const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const addVote = (blog) => {
    return async dispatch => {
        // const data = {
        //     ...blog,
        //     likes: blog.likes + 1
        // }
        // const updatedBlog = await blogService.update(id, data)
        dispatch(setVote(blog))
    }
}
export const addBlog = (blog) => {
    return async dispatch => {
        // const newBlog = await blogService.create(blog)
        dispatch(appendBlog(blog))
    }
}
export const deleteBlog = (blog) => {
    return async dispatch => {
        // await blogService.remove(blog.id);
        dispatch(removeBlog(blog))
    }
}

export default blogSlice.reducer