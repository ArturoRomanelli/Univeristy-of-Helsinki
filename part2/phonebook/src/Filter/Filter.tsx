const Filter = (props: {
  search: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <h2>Search</h2>
      <input value={props.search} onChange={props.handleChangeSearch} />
    </>
  );
};
export default Filter;
