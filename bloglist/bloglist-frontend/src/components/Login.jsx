import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const Login = ({ handleUser, handleNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      handleUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUserAppBlog", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      handleNotification({ message: "wrong credentials", error: true });
      setTimeout(() => {
        handleNotification({ message: null, error: false });
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>log in to the application</h2>
      <div>
        <label>username</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        Login
      </button>
    </form>
  );
};

export default Login;
