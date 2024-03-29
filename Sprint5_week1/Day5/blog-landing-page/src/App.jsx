import React, { useState } from "react";
import "./App.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MainContent from "./MainContent.jsx";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
//!
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

function App() {
  //! States to manage user data
  const [TrackLogin, setTrackLogin] = useState(false);
  const [formshowed, setFormshowed] = useState(false);
  const [users, setUsers] = useState([
    {
      email: "user1@example.com",
      username: "user1",
      password: "password1",
    },
    {
      email: "user2@example.com",
      username: "user2",
      password: "password2",
    },
  ]);

  //* Dynamic header content
  const name = "BlogApp";
  const links = [
    { name: "Home", link: "" },
    { name: "Blogs", link: "" },
    { name: "About Us", link: "" },
  ];
  const backgroundColor = "#627254";

  //* Initialize state for blog posts
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

  //* State variables for new post form
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  //* Function to handle input change in the new post form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  //** function for adding new post
  const handleAddPost = () => {
    //** Check if title and description not empty
    if (newPost.title.trim() !== "" && newPost.description.trim() !== "") {
      //** Add new post to the posts array
      setPosts([...posts, newPost]);
      //** Clear the form and hide it
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
        TrackLogin={TrackLogin}
        headerColor={backgroundColor}
      />
      {TrackLogin && (
        <>
          <div className="add-post-form">
            {/* //*Show "Add New Blog" button when form is not visible */}
            {!showForm && (
              <button onClick={() => setShowForm(true)}>Add New Blog</button>
            )}
            {/* //*Show form to add new blog post when form is visible */}
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
          <MainContent posts={posts} setPosts={setPosts} />
        </>
      )}
      {/* //! login and sign up */}
      {!TrackLogin && (
        <>
          {/* //   <LoginForm users={users} setTrackLogin={setTrackLogin} />
        //   <SignUpForm users={users} setUsers={setUsers} /> */}

          {!formshowed && (
            <>
              <LoginForm users={users} setTrackLogin={setTrackLogin} />
              <p>
                You don't have an account yet ?{" "}
                <button onClick={() => setFormshowed(true)}>Sign Up</button>
              </p>
            </>
          )}

          {/* Show sign-up form if TrackLogin is true */}
          {formshowed && (
            <>
              <SignUpForm users={users} setUsers={setUsers} />
              <p>
                You already have an account ?{" "}
                <button onClick={() => setFormshowed(false)}>Log In</button>
              </p>
            </>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
