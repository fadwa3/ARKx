import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBlog({ posts, setPosts }) {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleAddBlog = () => {
    if (newPost.title.trim() !== "" && newPost.description.trim() !== "") {
      setPosts([...posts, newPost]);
      navigate("/home");

      setNewPost({
        title: "",
        description: "",
      });
    }
  };

  return (
    <div className="add-post-form">
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newPost.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="button" onClick={handleAddBlog}>
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
