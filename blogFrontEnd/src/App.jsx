import { useEffect, createRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router,  Routes, Route, Link } from 'react-router-dom'
import { setUserStorage } from "./reducers/loginReducer"
import { initializeBlogs } from "./reducers/blogReducer";
import { getAllUsers } from "./reducers/userReducer";
import { addNotification } from "./reducers/notificationReducer";
import Login from "./components/Login";
import Notification from "./components/Notificacion";
import Users from "./components/Users";
import User from "./components/User";
import Home from "./components/Home";
import blogService from "./services/blogs";
import userService from "./services/users";
import storage from "./services/storage";
import Blog from "./components/Blog";

const App = () => {
  const padding = {
    padding: 5
  }
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const resultUser = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  })

  const blogs = result.data
  const users = resultUser.data
  useEffect(() => {    
    dispatch(initializeBlogs(blogs))
    dispatch(getAllUsers(users))
  }, [blogs, users])

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUserStorage(user))
    }
  }, [])

  const blogFormRef = createRef()

  const handleLogout = () => {
    dispatch(setUserStorage(null))
    storage.removeUser();
    dispatch(addNotification(`Bye, ${user.name}!`,10))
  }

  const handleCreate = () => {
    blogFormRef.current.toggleVisibility()
  } 

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }  

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">Blogs</Link>
          <Link style={padding} to="/users">Users</Link>
        </div>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>      
    </div>
  )
}

export default App;
