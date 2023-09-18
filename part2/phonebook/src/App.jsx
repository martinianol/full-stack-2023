import { useState, useEffect } from "react";
import Filter from "./components/FIlter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const getPersons = () => {
    personsService.getAll().then((personsData) => setPersons(personsData));
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

    const personExists = persons.find((person) => person.name === nameToSave);
    const personExistsIndex = persons.findIndex(
      (person) => person.name === nameToSave
    );

    if (personExists) {
      const confirmToProceed = window.confirm(
        `${nameToSave} is already added to phonebook, replace the old number with the new one?`
      );
      if (confirmToProceed) {
        const personToEdit = { ...personExists, number: numberToSave };

        personsService
          .updatePerson(personToEdit.id, personToEdit)
          .then((updatedPerson) => {
            const updatedPersons = persons.toSpliced(
              personExistsIndex,
              1,
              updatedPerson
            );
            setPersons(updatedPersons);
            addNotification(`${updatedPerson.name} number has been updated`);
            setNewName("");
            setNewNumber("");
          });

        return;
      } else {
        return;
      }
    } else {
      if (nameToSave !== "") {
        const newPerson = {
          name: nameToSave,
          number: numberToSave,
        };

        personsService
          .create(newPerson)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            addNotification(`Added ${returnedPerson.name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
            addNotification(
              `Error: ${error.response.data.error}`,
              true
            );
          });
      }
    }
  };

  const addNotification = (message, isError) => {
    setNotificationMessage(message);
    setIsError(isError);
    setTimeout(() => {
      setNotificationMessage(null);
      setIsError(false);
    }, 5000);
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(error);
          addNotification(
            `Information of ${personToDelete.name} has already been removed from server`,
            true
          );
        });
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
      <Notification message={notificationMessage} isError={isError} />
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
      <Persons persons={personsToShow} handleDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
