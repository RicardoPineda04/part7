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
        }
    }
})

export const { setBlogs, setVote, appendBlog } = blogSlice.actions
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const addVote = (id, blog) => {
    return async dispatch => {
        const data = {
            ...blog,
            likes: blog.likes + 1
        }
        const updatedBlog = await blogService.update(id, data)
        dispatch(setVote(updatedBlog))
    }
}
export const addBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer