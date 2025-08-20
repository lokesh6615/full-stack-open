import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundamentals of React",
    exercise: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercise: 7,
  };
  const part3 = {
    name: "State of a component",
    exercise: 13,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />

      <Total
        totalExercises={part1.exercise + part2.exercise + part3.exercise}
      />
    </div>
  );
};

export default App;
