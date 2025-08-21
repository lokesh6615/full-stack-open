const Total = ({ parts }) => {
  const sumOfExercises = () => {
    let sum = 0;
    for (const i in parts) sum += parts[i].exercises;
    return sum;
  };
  return (
    <p>
      Number of exercises
      {sumOfExercises()}
    </p>
  );
};

export default Total;
