const Country = ({ country }) => {
  if (!country) return null;
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languagues:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => <li key={key}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  );
};

export default Country;
