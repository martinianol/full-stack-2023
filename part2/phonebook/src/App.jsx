import { useState } from "react";
const originalPersons = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const App = () => {
  const [persons, setPersons] = useState(originalPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value);
  };

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

  const personsToShow =
    filteredName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <span>filter shown with</span>
        <input value={filteredName} onChange={handleFilterChange} />
      </div>
      <h2>Add a new Person</h2>
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
      {personsToShow.map((person) => (
        <p key={person.name}>
          <span>{person.name}</span> <span>{person.number}</span>
        </p>
      ))}
    </div>
  );
};

export default App;
