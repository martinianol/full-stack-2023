import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSaveName = (event) => {
    event.preventDefault();
    const nameToSave = newName.trim();

    const nameExists = persons.some((person) => person.name === nameToSave);

    if (nameExists) {
      window.alert(`${nameToSave} is already added to phonebook`);
      return;
    }

    if (nameToSave !== "") {
      const newPerson = {
        name: nameToSave,
      };

      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSaveName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
