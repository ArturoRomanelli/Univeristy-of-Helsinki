import { useEffect, useState } from "react";
import countriesService from "./services/countriesService";
import type { Country } from "./interfaces/country";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const getCountries = async () => {
    const response = await countriesService.getAll();

    setCountries(response);
  };
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country: Country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  }, [search, countries]);

  return (
    <>
      <div>
        <h1>Find Countries</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <table>
            <tbody>
              <td>
                <p key={country.name.common}>{country.name.common}</p>
              </td>
              <td>
                <button
                  key={country.name.common}
                  onClick={() => setSearch(country.name.common)}
                >
                  Show
                </button>
              </td>
            </tbody>
          </table>
        ))
      )}
    </>
  );
}

export default App;
