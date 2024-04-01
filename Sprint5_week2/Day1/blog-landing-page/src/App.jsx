import React, { useState, useReducer, useContext } from "react";

import "./App.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MainContent from "./MainContent.jsx";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import { Routes, Route } from "react-router-dom";
import AddBlog from "./AddBlog.jsx";
//! Define Theme States and Actions
const lightTheme = {
  backgroundColor: "white",
  color: "black",
};

const darkTheme = {
  backgroundColor: "black",
  color: "white",
};
//! Create the Reducer Function
function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return state === lightTheme ? darkTheme : lightTheme;
    default:
      return state;
  }
}
//! Create a Theme Context:
export const ThemeContext = React.createContext(lightTheme);

//! Theme provider component
function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, lightTheme);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
function ThemeSwitcher() {
  const { toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>Switch Theme</button>;
}

function App() {
  //! States to manage user data
  const [TrackLogin, setTrackLogin] = useState(false);
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
    { name: "Home", link: "/home" },
    { name: "New Blog", link: "/AddBlog" },
    { name: "Blogs", link: "/home" },
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

  return (
    <ThemeProvider>
      <div className="main">
        <Header
          name={name}
          links={links}
          TrackLogin={TrackLogin}
          headerColor={backgroundColor}
        />
        <ThemeSwitcher />
        {/* the routes */}
        <Routes>
          {/* //! login and sign up */}

          <Route
            path="/login"
            element={
              <>
                <LoginForm users={users} setTrackLogin={setTrackLogin} />
                <p>
                  You don't have an account yet ?{" "}
                  <button>
                    <a href="/signup">Sign Up</a>
                  </button>
                </p>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUpForm users={users} setUsers={setUsers} />
                <p>
                  You already have an account ?{" "}
                  <button>
                    <a href="/login">Log In</a>
                  </button>
                </p>
              </>
            }
          />
          {TrackLogin && <> </>}
          <Route
            path="/home"
            element={
              <MainContent
                posts={posts}
                setPosts={setPosts}
                TrackLogin={TrackLogin}
              />
            }
          />
          <Route
            path="/AddBlog"
            element={
              <AddBlog
                posts={posts}
                setPosts={setPosts}
                TrackLogin={TrackLogin}
              />
            }
          />
          {console.log(TrackLogin)}
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
