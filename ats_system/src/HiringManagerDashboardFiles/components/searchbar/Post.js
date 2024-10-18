import React from "react";

const Post = ({ post }) => {
  return (
    <article>
      <h2>{post.appliedPosition}</h2>
      <p>post id: {post.id}</p>
    </article>
  );
};

export default Post;
