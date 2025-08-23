import { useEffect, useState } from "react";
import axios from "axios";
import CountryData from "./components/CountryData";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [toDisplay, setToDisplay] = useState(null);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountriesData(response.data))
      .catch((err) => console.log("Error fetching countries data", err));
  }, []);
  useEffect(() => {
    if (filtered.length > 10 && toDisplay !== null) {
      setToDisplay(null);
    }
  }, [filtered, toDisplay]);
  const searchCountries = (e) => {
    console.log("target value", e.target.value);
    const filteredValues = countriesData.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value)
    );
    setFiltered(filteredValues);
  };
  return (
    <>
      <div>
        find countries
        <input type="text" onChange={searchCountries} />
      </div>
      <div>
        {filtered.length > 10 ? (
          <p>Too many matches specify another filter</p>
        ) : filtered.length > 1 ? (
          filtered.map((c) => (
            <p key={c.cca3}>
              {c.name.common}{" "}
              <button onClick={() => setToDisplay(c)}>show</button>
            </p>
          ))
        ) : (
          filtered.map((c) => <CountryData key={c.cca3} c={c} />)
        )}
        {toDisplay ? <CountryData key={toDisplay.cca3} c={toDisplay} /> : null}
      </div>
    </>
  );
}

export default App;
