const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => (
    <p key={person.name}>
      <span>{person.name}</span> <span>{person.number}</span> <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  ));
};

export default Persons;
