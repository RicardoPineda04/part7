import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { addBlog } from "../reducers/blogReducer"
import { addNotification } from "../reducers/notificationReducer";


const NewBlog = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = { 
      title: event.target.title.value, 
      url: event.target.url.value, 
      author: event.target.author.value
    }
    dispatch(addBlog(newBlog))
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
