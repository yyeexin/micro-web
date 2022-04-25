import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="nav-bar">
        <Link to="/vue2-app">vue2-app</Link>
        <Link to="/vue3-app">vue3-app</Link>
      </div>
      <div id="micro-container"></div>
    </BrowserRouter>
  );
};

export default App;
