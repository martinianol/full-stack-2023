import { useState, useEffect } from "react";
import Notes from "./components/Notes/Notes";
import NoteForm from "./components/Notes/NoteForm";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import noteService from "./services/notes";
import loginService from "./services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const getNotes = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  };

  useEffect(getNotes, []);
  useEffect(getUserFromLocalStorage, []);

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (error) {
      console.log(error);
      setErrorMessage("There's been an error creating the note");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      )
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel={"Login"}>
          <Login onLogin={handleLogin} />
        </Togglable>
      ) : (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>Log out</button>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote} />
          </Togglable>
        </>
      )}
      <Notes notes={notes} toggleImportanceOf={toggleImportanceOf} />
      <Footer />
    </>
  );
};

export default App;
