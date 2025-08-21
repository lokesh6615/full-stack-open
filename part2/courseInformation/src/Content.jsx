import Part from "./Part.jsx";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => {
        return <Part part={element} />;
      })}
    </div>
  );
};

export default Content;
