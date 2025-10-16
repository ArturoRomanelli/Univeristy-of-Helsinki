import { useEffect, useState } from "react";
import type { Person } from "./Interfaces/Person";
import PhoneBookForm from "./components/PhoneBookForm";
import Filter from "./components/Filter";
import PhoneBookNumbers from "./components/PhoneBookNumbers";
import phonenumbers from "./services/phonenumbers";

const App = () => {
  //Hooks
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [notificationStyle, setNotificationStyle] = useState<string>("success");
  useEffect(() => {
    (async () => {
      const initialPeople = await phonenumbers.getAll();
      setPersons(initialPeople);
    })();
  }, []);

  //Functions
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
      const confirm = window.confirm(
        `${person?.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (!confirm) {
        return;
      }
      await phonenumbers.update(person!.id, {
        name: newName,
        number: newNumber,
        id: person!.id,
      });
      setNotificationStyle("success");
      setMessage(`Updated ${person?.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setPersons(
        persons.map((person) => (person.id === person!.id ? person : person))
      );
      console.log(persons);
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = (await phonenumbers.create({
      name: newName,
      number: newNumber,
    })) as Person;
    setPersons(persons.concat(newPerson));
    setNotificationStyle("success");

    const newMessage = setMessage(`Inserted ${newPerson?.name}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    console.log(newMessage);

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = async (id: number) => {
    const confirm = window.confirm(
      `Delete ${persons.find((person) => person.id === id)?.name}`
    );
    if (!confirm) {
      return;
    }
    await phonenumbers.deletePerson(id).catch(() => {
      setNotificationStyle("error");
      setMessage(
        `Person ${
          persons.find((person) => person.id === id)?.name
        } was already deleted`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });

    setPersons(persons.filter((person) => person.id !== id));
  };

  //Render
  return (
    <div>
      <PhoneBookForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
        message={message}
        notificationStyle={notificationStyle}
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
