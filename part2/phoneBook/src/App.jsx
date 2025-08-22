import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", phoneNo: "8927474363" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNo, setNewPhoneNo] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const personBool = persons.some((person) => person.name === newName);
    if (personBool) {
      setNewName("");
      alert(`${newName} is already added to phone book`);
      return;
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      phoneNo: newPhoneNo,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewPhoneNo("");
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
      </div>
      <br />
      <div>
        <b>Add a new</b>
      </div>

      <form onSubmit={addPerson}>
        <div>
          <p>
            name:
            <input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </p>
          <p>
            Phone Number:
            <input
              type="number"
              onChange={(e) => setNewPhoneNo(String(e.target.value))}
              value={newPhoneNo}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phoneNo}
        </p>
      ))}
    </div>
  );
};

export default App;
