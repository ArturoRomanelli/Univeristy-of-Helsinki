const Total = (props: { parts: { name: string; exercises: number }[] }) => {
  return (
    <div>
      <p>
        Total of exercises {""}
        {props.parts.reduce((total, part) => total + part.exercises, 0)}
      </p>
    </div>
  );
};

export default Total;
