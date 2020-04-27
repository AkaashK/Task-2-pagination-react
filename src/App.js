import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

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
    const postLimit = event.target.value;
    setPostsPerPage(postLimit);
  };

  const handleChangePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChangeNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const calculateValue = postsPerPage * currentPage;
  const enableButton =
    calculateValue > postsPerPage * (currentPage - 1) &&
    calculateValue < posts.length;

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">React Posts</h1>
      <Posts posts={currentPosts} />
      <button disabled={currentPage === 1} onClick={handleChangePrevPage}>
        Prev
      </button>{" "}
      <button disabled={!enableButton} onClick={handleChangeNextPage}>
        Next
      </button>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <br />
      <select onChange={handlePostsPerPageChange}>
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
    </div>
  );
};

export default App;
