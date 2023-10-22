import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });

  useEffect(() => {
    if (user) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUserAppBlog");
    setUser(null);
  };

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedUserAppBlog");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  };

  useEffect(getUserFromLocalStorage, []);

  const handleCreateBlog = async (newBlog) => {
    try {
      const blogAdded = await blogService.createBlog(newBlog);
      setBlogs((prevState) => prevState.concat([blogAdded]));
      const notification = `a new blog ${blogAdded.title} by ${blogAdded.author} added`;
      setNotification({ message: notification, error: false });
      setTimeout(() => {
        setNotification({ message: null, error: false });
      }, 5000);
    } catch (error) {
      console.log(error);
      setNotification({
        message: "There's been an error creating the blog",
        error: true,
      });
      setTimeout(() => {
        setNotification({ message: null, error: false });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {!user && (
        <Login handleUser={setUser} handleNotification={setNotification} />
      )}

      {notification.message && (
        <Notification
          message={notification.message}
          isError={notification.error}
        />
      )}
      {user && (
        <>
          <UserInfo user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel="Create New Blog">
            <CreateBlog createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
