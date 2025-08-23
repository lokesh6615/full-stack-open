import { useEffect, useState } from "react";
import axios from "axios";

const CountryData = ({ c }) => {
  if (c === null) return null;
  const [weatherData, setWeatherData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_APIID;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${c.capital[0]}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        setImageUrl(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
      })
      .catch((err) => console.log("Unable to fetch weather data", err));
  }, []);

  return (
    <div>
      <h2>
        <b>{c.name.common}</b>
      </h2>
      <p>{c.capital[0]}</p>
      <p>Area {c.area}</p>
      <h3>
        <b>Languages</b>
      </h3>
      {Object.values(c.languages).map((l) => (
        <p key={l}>{l}</p>
      ))}
      <img src={c.flags.png} alt="flag" />
      {weatherData ? (
        <div>
          <p>Temperature {weatherData.main.temp} Celsius</p>
          <img src={imageUrl} alt="temp" />
          <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
};

export default CountryData;
