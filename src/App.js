import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const selectOptions = [5, 10, 20, 30];

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(event.target.value);
  };

  const handleChangePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChangeNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const calculateValue = postsPerPage * currentPage;
  const totalLengthOfPosts = posts.length;
  const enableButton =
    calculateValue > postsPerPage * (currentPage - 1) &&
    calculateValue < totalLengthOfPosts;

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">React Posts</h1>
      <Posts posts={currentPosts} />
      <button disabled={currentPage === 1} onClick={handleChangePrevPage}>
        Prev
      </button>
      <button disabled={!enableButton} onClick={handleChangeNextPage}>
        Next
      </button>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalLengthOfPosts}
        paginate={paginate}
      />
      <br />
      <select onChange={handlePostsPerPageChange}>
        {selectOptions.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default App;
