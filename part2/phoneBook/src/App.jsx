import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import notes from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    notes
      .httpGet()
      .then((response) => setPersons(response))
      .catch((err) => console.log("Error fetching persons", err));
  }, []);
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
      number: newPhoneNo,
    };
    notes
      .httpPost(newPerson)
      .then((response) => {
        setPersons([...persons, response]);
      })
      .catch((err) => {
        console.log("Error creating new person", err);
      });
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
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Persons key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
