import React from "react";

function MainContent({ posts }) {
  return (
    <div className="MainContent">
      <h1>Blog Application</h1>
      <div className="blogPosts">
        {posts.length == 0 ? (
          <p>OOps No posts are available</p>
        ) : (
          posts.map((post, index) => (
            <div className="PostContainer" key={index}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MainContent;
