import { useSelector, useDispatch  } from "react-redux"
import { Link } from "react-router-dom"
import userService from "../services/users"
import { getAllUsers } from "../reducers/userReducer"
import blogService from "../services/blogs"
import Blog from "./Blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNotification } from "../reducers/notificationReducer"
import { deleteBlog, addVote } from "../reducers/blogReducer"

const Users = () => {
    const users = useSelector((state) => state.users)  
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Usuarios</th>
                        <th>Blogs creados</th>
                    </tr>                    
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>
                                {user.username}
                            </Link>
                        </td>
                        <td>{user.blogs.length}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users;