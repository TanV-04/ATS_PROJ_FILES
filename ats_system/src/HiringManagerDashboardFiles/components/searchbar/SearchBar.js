import React from "react";
import "../searchbar/searchbar.css"

const SearchBar = ({ posts, setSearchItem, searchIcon }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // e is an anonymous function
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      // reset to all posts if search is empty
      return setSearchItem(posts);
    }

    const resultsArray = posts.filter(
      (post) => post.appliedPosition.toLowerCase().includes(searchValue) // Convert to lowercase for comparison
    );

    setSearchItem(resultsArray);
  };

  return (
    <>
      <div>
        <header>
          <form onSubmit={handleSubmit} className="search">
            <input
              className="search_input text-black"
              type="text"
              id="search"
              onChange={handleSearchChange}
            />
            <button className="m-5 search_button">{searchIcon}</button>
          </form>
        </header>
      </div>
    </>
  );
};

export default SearchBar;
