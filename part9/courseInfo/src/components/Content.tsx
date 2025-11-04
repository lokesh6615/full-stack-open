interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.name}>
          <h2>Name: {part.name}</h2>
          <h2>No. of exercises: {part.exerciseCount}</h2>
        </div>
      ))}
    </div>
  );
};

export default Content;
