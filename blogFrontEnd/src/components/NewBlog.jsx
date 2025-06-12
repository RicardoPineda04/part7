import { useDispatch } from "react-redux"
import blogService from "../services/blogs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addBlog } from "../reducers/blogReducer"
import { addNotification } from "../reducers/notificationReducer"

const NewBlog = ({doCreate}) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      })
      dispatch(addBlog(data))
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = { 
      title: event.target.title.value, 
      url: event.target.url.value, 
      author: event.target.author.value
    }  
    newBlogMutation.mutate(newBlog)
    doCreate()
    dispatch(addNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 10))
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            data-testid="title"
            name="title"
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            data-testid="url"
            name="url"
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            data-testid="author"
            name="author"
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;