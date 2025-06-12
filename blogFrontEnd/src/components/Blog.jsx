import storage from "../services/storage";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addVote, deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { addNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  
  const blogId = useParams().id
  const result = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getBlogInfo(blogId)
  })
  
  const updateBlogMutation = useMutation({
    mutationFn: ({id, data}) => blogService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['blog']
      })
      dispatch(addVote(data))
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['blog']
      })
      dispatch(deleteBlog(data));
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blog = result.data
  
  const nameOfUser = blog.user ? blog.user.name : "anonymous";


  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const canRemove = blog.user ? blog.user.username === storage.me() : true;  

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
    <div style={style} className="blog">
      {blog.title} by {blog.author}
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
              like
            </button>
          </div>
          <div>{nameOfUser}</div>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
    </div>
  );
};

export default Blog;
