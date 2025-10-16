import type { Country } from "../interfaces/country";

const CountryDetails = ({ country }: { country: Country }) => {
  const languages = Object.entries(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>

      {country.capital.length === 1 ? (
        <p>Capital: {country.capital[0]}</p>
      ) : (
        <p>Capitals: {country.capital.join(", ")}</p>
      )}
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

export default CountryDetails;
