import { useState, useEffect } from "react";
import Country from "./Country";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

function App() {
  const [search, setSearch] = useState("");
  const [originalCountries, setOriginalCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState("Fetching countries...");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setCountries(
      originalCountries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const urlToAll = baseUrl + "/api/all";
    setLoading(true);
    axios.get(urlToAll).then((response) => {
      console.log(response);
      setOriginalCountries(response.data);
      setCountries(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (countries.length === 1) {
      setLoading(true);
      setLoadingContent("Fetching country specific info...");
      const countryName = countries[0].name.common;
      const urlToSpecific = baseUrl + "/api/name/" + countryName;

      axios.get(urlToSpecific).then((response) => {
        console.log(response);
        setCountry(response.data);
        setLoading(false);
      });
    }
  }, [countries]);

  const contentToDisplay =
    countries.length > 10 ? (
      <p>Too many matches, please be more specific</p>
    ) : countries.length > 1 ? (
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    ) : (
      <Country country={country} />
    );

  console.log(countries.length);

  return (
    <div>
      <label>find countries</label>
      <input type="text" value={search} onChange={handleInputChange} />
      {isLoading ? <p>{loadingContent}</p> : contentToDisplay}
    </div>
  );
}

export default App;
