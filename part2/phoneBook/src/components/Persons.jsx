const Persons = ({ person, onDelete }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </p>
  );
};
export default Persons;
