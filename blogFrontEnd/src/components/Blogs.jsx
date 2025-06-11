import { useSelector, useDispatch  } from "react-redux"
import blogService from "../services/blogs"
import Blog from "./Blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNotification } from "../reducers/notificationReducer"
import { deleteBlog, addVote } from "../reducers/blogReducer"

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)  
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const byLikes = (a, b) => b.likes - a.likes;

    const updateBlogMutation = useMutation({
        mutationFn: ({id, data}) => blogService.update(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['blogs']
            })
            dispatch(addVote(data))
        }
    })

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.remove,
        onSuccess: (data) => {
            console.log(data);
            
            queryClient.invalidateQueries({
                queryKey: ['blogs']
            })
            dispatch(deleteBlog(data));
        }
    }) 

    const handleVote = async (blog) => {        
        const data = {
            ...blog,
            likes: blog.likes + 1
        }        
        updateBlogMutation.mutate({
            id: blog.id,
            data
        })
        dispatch(addNotification(`You liked ${blog.title} by ${blog.author}`,10))
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlogMutation.mutate(blog.id)
            dispatch(addNotification(`Blog ${blog.title}, by ${blog.author} removed`,10))
        }
    }

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleVote={handleVote}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    )
}

export default Blogs;