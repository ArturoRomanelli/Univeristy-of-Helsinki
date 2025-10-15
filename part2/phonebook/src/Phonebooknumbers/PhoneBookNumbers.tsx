import type { Person } from "../Interfaces/Person";

const PhoneBookNumbers = (props: {
  search: string;
  persons: Person[];
  filteredPersons: Person[];
}) => {
  return (
    <>
      <h2>Numbers</h2>
      <table>
        {props.search === ""
          ? props.persons.map((person) => (
              <tbody key={person.id}>
                <tr>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                </tr>
              </tbody>
            ))
          : props.filteredPersons.map((person) => (
              <tbody key={person.id}>
                <tr>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                </tr>
              </tbody>
            ))}
      </table>
    </>
  );
};
export default PhoneBookNumbers;
