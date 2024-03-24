import logo from "./logo.svg";
import "./App.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MainContent from "./MainContent.jsx";

function App() {
  // * dynamic header content
  const name = "BlogApp";
  const links = [
    { name: "Home", link: "" },
    { name: "Blogs", link: "" },
    { name: "About Us", link: "" },
  ];
  const isLoggedIn = true;
  const backgroundColor = "#627254";

  // * array  of blog posts
  const posts = [
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
      description: "This is the first blog post.",
    },
    {
      title: "Blog Post 5",
      description: "This is the first blog post.",
    },
    {
      title: "Blog Post 6",
      description: "This is the first blog post.",
    },
  ];

  return (
    <div className="main">
      <Header
        name={name}
        links={links}
        isLoggedIn={isLoggedIn}
        headerColor={backgroundColor}
      />
      <MainContent posts={posts} />
      <Footer />
    </div>
  );
}

export default App;
