import React, { useState } from "react";

function MainContent({ posts, setPosts }) {
  //* State variables for editing
  const [editingPostIndex, setEditingPostIndex] = useState(null);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    description: "",
  });

  //*editing a post get the index of the post and it's data
  const handleEditPost = (index) => {
    setEditingPostIndex(index);
    setUpdatedPost({
      title: posts[index].title,
      description: posts[index].description,
    });
  };
  //*deleting a post
  const handleDeletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  //*updating a post
  const handleUpdatePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = { ...updatedPost };
    setPosts(updatedPosts);
    setEditingPostIndex(null);
    setUpdatedPost({
      title: "",
      description: "",
    });
  };

  //*Function to handle input change in the updated post form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({
      ...updatedPost,
      [name]: value,
    });
  };

  return (
    <div className="MainContent">
      <h1>Blog Application</h1>

      <div className="blogPosts">
        {posts.length === 0 ? (
          <p>Oops, No posts are available</p>
        ) : (
          posts.map((post, index) => (
            <div className="PostContainer" key={index}>
              {editingPostIndex === index ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={updatedPost.title}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description"
                    value={updatedPost.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <button onClick={() => handleUpdatePost(index)}>
                    Update
                  </button>
                </div>
              ) : (
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <button onClick={() => handleEditPost(index)}>Edit</button>
                  <button onClick={() => handleDeletePost(index)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MainContent;
