import { useState } from "react";
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: true,
    };
    await createNote(noteObject);
    setNewNote("");
  };

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={({ target }) => setNewNote(target.value)}
        placeholder="write note content here"
        id="note-input"
      />
      <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;
