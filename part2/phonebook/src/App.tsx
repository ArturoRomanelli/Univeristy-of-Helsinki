import { useState } from "react";
import type { Person } from "./Interfaces/Person";
import PhoneBookForm from "./Phonebookform/PhoneBookForm";
import Filter from "./Filter/Filter";
import PhoneBookNumbers from "./Phonebooknumbers/PhoneBookNumbers";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearch(search);
    const newSearch = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPersons(newSearch);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (newName === "") {
      alert("Please enter a name");
      return;
    }
    if (newNumber === "") {
      alert("Please enter a number");
      return;
    }
    if (isNaN(Number(newNumber))) {
      alert("Please enter a valid number");
      return;
    }
    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <PhoneBookForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />
      <Filter search={search} handleChangeSearch={handleChangeSearch} />
      <PhoneBookNumbers
        search={search}
        persons={persons}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
