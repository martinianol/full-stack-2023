import { useEffect, useState } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const CountryDetails = ({ country }) => {
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  
  useEffect(() => {
    if (country) {
      const [lat, lon] = country.latlng;
      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      axios.get(weatherAPI).then((response) => {
        console.log(response);
        console.log(response.data);
        setTemperature(response.data.main.temp)
        setWind(response.data.wind.speed)
        setWeatherIcon(response.data.weather[0].icon)
      });
    }
  }, [country]);

  if (!country) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languagues:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h3>Weather in Helsinski</h3>
      <p>temperature {temperature} Celsius </p>
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
      <p>wind {wind} m/s </p>
    </div>
  );
};

export default CountryDetails;
