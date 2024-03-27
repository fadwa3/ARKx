import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MainContent from "./MainContent.jsx";

function App() {
  // Dynamic header content
  const name = "BlogApp";
  const links = [
    { name: "Home", link: "" },
    { name: "Blogs", link: "" },
    { name: "About Us", link: "" },
  ];
  const isLoggedIn = true;
  const backgroundColor = "#627254";

  // Initialize state for blog posts
  const [posts, setPosts] = useState([
    {
      title: "Blog Post 1",
      description: "This is the first blog post.",
    },
    {
      title: "Blog Post 2",
      description: "This is the second blog post.",
    },
    {
      title: "Blog Post 3",
      description: "This is the third blog post.",
    },
    {
      title: "Blog Post 4",
      description: "This is the fourth blog post.",
    },
    {
      title: "Blog Post 5",
      description: "This is the fifth blog post.",
    },
    {
      title: "Blog Post 6",
      description: "This is the sixth blog post.",
    },
  ]);

  // State variables for new post form
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  // Function to handle input change in the new post form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  //* function for adding new post
  const handleAddPost = () => {
    //* Check if title and description not empty
    if (newPost.title.trim() !== "" && newPost.description.trim() !== "") {
      //* Add new post to the posts array
      setPosts([...posts, newPost]);
      //* Clear the form and hide it
      setNewPost({
        title: "",
        description: "",
      });
      setShowForm(false);
    }
  };

  return (
    <div className="main">
      <Header
        name={name}
        links={links}
        isLoggedIn={isLoggedIn}
        headerColor={backgroundColor}
      />
      <div className="add-post-form">
        {/* Show "Add New Blog" button when form is not visible */}
        {!showForm && (
          <button onClick={() => setShowForm(true)}>Add New Blog</button>
        )}
        {/* Show form to add new blog post when form is visible */}
        {showForm && (
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
            <button type="button" onClick={handleAddPost}>
              Add Post
            </button>
          </form>
        )}
      </div>
      <MainContent posts={posts} setPosts={setPosts}/>
      <Footer />
    </div>
  );
}

export default App;
