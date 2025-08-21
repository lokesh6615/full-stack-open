import Part from "./Part.jsx";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => {
        return <Part key={element.id} part={element} />;
      })}
    </div>
  );
};

export default Content;
