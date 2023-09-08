import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
        <div class="navbar">
            <h1>Home Page</h1>
        </div>
        <div class="">
            <div class="section">
                <h2>Users</h2>
                <p>Welcome to the Users section.</p>
                <a class="button" href="/users">View Users</a>
            </div>
            <div class="section">
                <h2>Products</h2>
                <p>Welcome to the Products section.</p>
                <a class="button" href="/products">View Products</a>
            </div>
        </div>
    </>
    
  );
};

export default HomePage;
