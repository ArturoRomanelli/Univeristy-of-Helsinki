const Part = (props: { part: string; exercises: number }) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

export default Part;
