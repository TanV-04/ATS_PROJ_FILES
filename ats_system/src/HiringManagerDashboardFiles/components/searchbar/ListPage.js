import React from "react";
import Post from "./Post";

const ListPage = ({ searchResults = [], searchTerm }) => {
  // Only display results if a search term is provided
  const results = searchTerm
    ? searchResults.map((post) => <Post key={post.id} post={post} />)
    : null;

  const content = results?.length
    ? results
    : searchTerm && (
        <article>
          <p>No matching posts</p>
        </article>
      );

  return <main>{content}</main>;
};

export default ListPage;
