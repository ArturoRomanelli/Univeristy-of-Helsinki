const Part = (props: { name: string; exercises: number }) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

export default Part;
