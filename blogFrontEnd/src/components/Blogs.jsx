import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux"
import { addNotification } from "../reducers/notificationReducer";
import { addVote } from "../reducers/blogReducer"
import blogService from "../services/blogs"

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)    
    const byLikes = (a, b) => b.likes - a.likes;
    const dispatch = useDispatch()

    const handleVote = async (blog) => {
        dispatch(addVote(blog.id, blog))
        dispatch(addNotification(`You liked ${blog.title} by ${blog.author}`,10))
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        notify(`Blog ${blog.title}, by ${blog.author} removed`);
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