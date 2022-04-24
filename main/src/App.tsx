import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      console.log(event);
    });
    window.addEventListener("pushState", function (event) {
      console.log(event);
    });
    window.addEventListener("replaceState", function (event) {
      console.log(event);
    });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const url = event.target.pathname;
    history.pushState(null, null, url);
  };

  return (
    <div className="nav-bar">
      <a href="/bar" onClick={handleClick}>
        bar
      </a>
      <a href="/foo" onClick={handleClick}>
        foo
      </a>
    </div>
  );
};

export default App;
