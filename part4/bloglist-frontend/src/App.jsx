import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUserAppBlog");
    setUser(null);
  };

  const getUserFromLocalStorage = () => {
    const loggedUserJSON  = window.localStorage.getItem("loggedUserAppBlog");
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  useEffect(getUserFromLocalStorage, []);

  return (
    <div>
      {!user ? (
        <Login handleUser={setUser} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Blogs blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
