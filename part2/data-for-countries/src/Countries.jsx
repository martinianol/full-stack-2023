const Countries = ({ countries, handleSelectCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca2}>
          {country.name.common}{" "}
          <button onClick={() => handleSelectCountry(country.name.common)}>
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
