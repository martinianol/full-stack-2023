const PersonForm = ({
  name,
  number,
  handleNameChange,
  handleNumberChange,
  handleFormSubmit,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
