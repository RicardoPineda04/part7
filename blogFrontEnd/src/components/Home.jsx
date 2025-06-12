import { createRef } from "react";
import Blogs from "../components/Blogs";
import NewBlog from "../components/NewBlog";
import Togglable from "../components/Toggable";

const Home = () => {
  const blogFormRef = createRef()

  const handleCreate = () => {
    blogFormRef.current.toggleVisibility()
  } 

  return (
    <div>
      <h2>Blogs</h2>     
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate}/>
      </Togglable>
      <Blogs />
    </div>
  )
}

export default Home