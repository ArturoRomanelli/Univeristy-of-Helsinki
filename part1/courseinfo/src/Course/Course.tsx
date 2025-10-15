import Content from "./Content/Content";
import Header from "./Header/Header";
import Total from "./Total/Total";

const Course = (props: {
  course: {
    id: number;
    name: string;
    parts: { id: number; name: string; exercises: number }[];
  };
}) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
