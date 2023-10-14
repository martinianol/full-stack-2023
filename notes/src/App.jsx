import { useState, useEffect } from "react";
import Notes from "./components/Notes/Notes";
import NoteForm from "./components/Notes/NoteForm";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Login from "./components/Login";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const getNotes = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }

  useEffect(getNotes, []);
  useEffect(getUserFromLocalStorage, []);

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    } catch (error) {
      console.log(error);
      setErrorMessage("There's been an error creating the note");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleNoteChange = (event) => setNewNote(event.target.value);

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

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Login handleUser={setUser} handleErrorMessage={setErrorMessage} />
      ) : (
        <>
          <p>{user.name} logged in</p> <button onClick={handleLogOut}>Log out</button>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            handleNoteChange={handleNoteChange}
          />
        </>
      )}
      <Notes notes={notes} toggleImportanceOf={toggleImportanceOf} />
      <Footer />
    </>
  );
};

export default App;
