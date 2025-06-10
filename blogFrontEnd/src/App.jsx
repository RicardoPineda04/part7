import { useState, useEffect, createRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notificacion";
import Togglable from "./components/Toggable";
import { useDispatch, useSelector } from "react-redux"
import { addNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUserStorage } from "./reducers/loginReducer"

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)
  const notification = useSelector(state => state.Notification)

  useEffect(() => {
    dispatch(initializeBlogs())    
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUserStorage(user))
    }
  }, []);

  const blogFormRef = createRef();

  const handleLogout = () => {
    dispatch(setUserStorage(null))
    storage.removeUser();
    dispatch(addNotification(`Bye, ${user.name}`,10))
  };

  

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <Login />
      </div>
    );
  }

  

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog/>
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
