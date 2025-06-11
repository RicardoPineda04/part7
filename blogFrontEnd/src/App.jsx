import { useEffect, createRef } from "react";

import blogService from "./services/blogs";
import storage from "./services/storage";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notificacion";
import Togglable from "./components/Toggable";
import { addNotification } from "./reducers/notificationReducer";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setUserStorage } from "./reducers/loginReducer"
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const blogs = result.data
  useEffect(() => {    
    dispatch(initializeBlogs(blogs))
  }, [blogs])

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
      <h2>Blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate}/>
      </Togglable>
      <Blogs />
    </div>
  )
}

export default App;
