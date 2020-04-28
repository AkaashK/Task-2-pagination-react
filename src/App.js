import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const selectOptions = [5, 10, 20, 30];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const totalLengthOfPosts = posts.length;
  const indexOfLastPost = currentPage * postsPerPage;

  //fetch data for api endpoint
  const fetchPosts = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get current posts
  const currentPosts = () => {
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const enableButton = () => {
    return (
      indexOfLastPost > postsPerPage * (currentPage - 1) &&
      indexOfLastPost < totalLengthOfPosts
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">React Posts</h1>
      <Posts posts={currentPosts()} />
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <button
        disabled={!enableButton()}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalLengthOfPosts}
        paginate={paginate}
      />
      <br />
      <select onChange={(event) => setPostsPerPage(event.target.value)}>
        {selectOptions.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default App;
