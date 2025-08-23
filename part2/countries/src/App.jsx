import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountriesData(response.data))
      .catch((err) => console.log("Error fetching countries data", err));
  }, []);
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
          filtered.map((c) => <p key={c.cca3}>{c.name.common}</p>)
        ) : (
          filtered.map((c) => {
            return (
              <div key={c.cca3}>
                <h2>
                  <b>{c.name.common}</b>
                </h2>
                <p>{c.capital[0]}</p>
                <p>Area {c.Area}</p>
                <h3>
                  <b>Languages</b>
                </h3>
                {Object.values(c.languages).map((l) => (
                  <p>{l}</p>
                ))}
                <img src={c.flags.png} alt="flag" />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
