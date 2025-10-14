const Total = (props: { parts: { name: string; exercises: number }[] }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((total, part) => total + part.exercises, 0)}
      </p>
    </div>
  );
};

export default Total;
