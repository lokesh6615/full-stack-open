const CountryData = ({ c }) => {
  if (c === null) return null;
  return (
    <div>
      <h2>
        <b>{c.name.common}</b>
      </h2>
      <p>{c.capital[0]}</p>
      <p>Area {c.Area}</p>
      <h3>
        <b>Languages</b>
      </h3>
      {Object.values(c.languages).map((l) => (
        <p key={l}>{l}</p>
      ))}
      <img src={c.flags.png} alt="flag" />
    </div>
  );
};

export default CountryData;
