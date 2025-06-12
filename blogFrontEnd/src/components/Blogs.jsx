import { useSelector, useDispatch  } from "react-redux"
import { Link } from "react-router-dom"
import blogService from "../services/blogs"
import Blog from "./Blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNotification } from "../reducers/notificationReducer"
import { deleteBlog, addVote } from "../reducers/blogReducer"

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)  
    const byLikes = (a, b) => b.likes - a.likes;

    return (
        <div className="list-group">
            {blogs.map((blog) => (
                <li key={blog.id} className="list-group-item">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            ))}
        </div>
    )
}

export default Blogs;