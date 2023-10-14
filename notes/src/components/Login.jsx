import { useState } from "react";
import loginService from "../services/login";
import notesService from "../services/notes";

const Login = ({ handleUser, handleErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      notesService.setToken(user.token);
      handleUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleErrorMessage("Wrong credentials");
      setTimeout(() => {
        handleErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
