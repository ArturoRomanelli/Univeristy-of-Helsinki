const PhoneBookForm = (props: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
}) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          name:{" "}
          <input value={props.newName} onChange={props.handleChangeName} />
        </div>
        <div>
          {" "}
          number:{" "}
          <input value={props.newNumber} onChange={props.handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
export default PhoneBookForm;
