import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
const NOTES_URL = "http://localhost:3002/notes";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const getNotes = () => {
    console.log("Inside useEffect");
    axios.get(NOTES_URL).then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };

  useEffect(getNotes, []);

  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    axios.post(NOTES_URL, noteObject).then((response) => {
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    const NOTE_URL = NOTES_URL + "/" + id;
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(NOTE_URL, changedNote).then((response) => {
      console.log(response);
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
