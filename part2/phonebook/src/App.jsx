import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSaveName = (event) => {
    event.preventDefault();
    const nameToSave = newName.trim();
    const numberToSave = newNumber.trim();

    const nameExists = persons.some((person) => person.name === nameToSave);

    if (nameExists) {
      window.alert(`${nameToSave} is already added to phonebook`);
      return;
    }

    if (nameToSave !== "") {
      const newPerson = {
        name: nameToSave,
        number: numberToSave,
      };

      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}><span>{person.name}</span> <span>{person.number}</span></p>
      ))}
    </div>
  );
};

export default App;
