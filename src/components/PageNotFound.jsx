import React from 'react';
import './PageNotFound.css'; 

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title ">Page Not Found</h1>

      <p className="notfound-message">The page you are looking for does not exist.</p>
      <a href="/" className="notfound-link">Go Back Home</a>
    </div>
  );
};

export default NotFoundPage;
