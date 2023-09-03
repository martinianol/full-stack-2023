import { useState, useEffect } from "react";
import Filter from "./components/FIlter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const SERVER_ADDRESS = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const getPersons = () => {
    axios.get(SERVER_ADDRESS).then((response) => {
      response.data;
      setPersons(response.data);
    });
  };

  useEffect(getPersons, []);

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSavePerson = (event) => {
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
      <Filter filterValue={filteredName} handleChange={handleFilterChange} />

      <h2>Add a new Person</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleSavePerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
