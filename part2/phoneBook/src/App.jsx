import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

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
      <Filter setFilter={setFilter} />
      <br />
      <Form
        setNewName={setNewName}
        setNewPhoneNo={setNewPhoneNo}
        addPerson={addPerson}
        newName={newName}
        newPhoneNo={newPhoneNo}
      />
      <br />

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
