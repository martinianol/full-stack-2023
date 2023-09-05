const Filter = ({ filterValue, handleChange }) => {
  return (
    <div>
      <span>filter shown with</span>
      <input value={filterValue} onChange={handleChange} />
    </div>
  );
};

export default Filter;
