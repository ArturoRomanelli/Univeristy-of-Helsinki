import { useEffect, useState } from "react";
import type { Person } from "./Interfaces/Person";
import PhoneBookForm from "./components/PhoneBookForm";
import Filter from "./components/Filter";
import PhoneBookNumbers from "./components/PhoneBookNumbers";
import phonenumbers from "./services/phonenumbers";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

  useEffect(() => {
    (async () => {
      const initialPeople = await phonenumbers.getAll();
      setPersons(initialPeople);
    })();
  }, []);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    if (persons.find((person) => person.name === newName) !== undefined) {
      const person = persons.find((person) => person.name === newName);
      console.log(person);
      console.log(persons);
      window.confirm(
        `${person?.name} is already added to phonebook, replace the old number with a new one?`
      );
      await phonenumbers.update(person!.id, {
        name: newName,
        number: newNumber,
        id: person!.id,
      });
      setPersons(
        persons.map((person) => (person.id === person!.id ? person : person))
      );
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = await phonenumbers.create({
      name: newName,
      number: newNumber,
    });
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = async (id: number) => {
    window.confirm(
      `Delete ${persons.find((person) => person.id === id)?.name}`
    );
    await phonenumbers.deletePerson(id);
    setPersons(persons.filter((person) => person.id !== id));
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
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
