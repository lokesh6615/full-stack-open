import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import notes from "./services/notes";
import Notification from "./components/Notification";

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
  const [statusMessage, setStatusMessage] = useState({});

  const addPerson = (e) => {
    e.preventDefault();
    const personBool = persons.find((person) => person.name === newName);
    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
      number: newPhoneNo,
    };
    if (personBool) {
      const conformation = confirm(
        `${newName} is already added to phonebook , replace the old number with the new one ?`
      );
      if (conformation) {
        notes.httpPut(personBool.id, newPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === personBool.id ? response : person
            )
          );
          const status = {
            message: "Phone Number updated successfully",
            type: "success",
          };
          setStatusMessage(status);
          setTimeout(() => setStatusMessage({}), 3000);
        });
        setNewName("");
        setNewPhoneNo("");
        return;
      }
    }
    notes
      .httpPost(newPerson)
      .then((response) => {
        setPersons([...persons, response]);
        const status = {
          message: "Phone Number added successfully",
          type: "success",
        };
        setStatusMessage(status);
        setTimeout(() => setStatusMessage({}), 3000);
      })
      .catch((err) => {
        console.log("Error creating new person", err);
      });
    setNewName("");
    setNewPhoneNo("");
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!personToDelete) {
      const status = {
        message: "This information is already deleted",
        type: "fail",
      };
      setStatusMessage(status);
      setTimeout(() => setStatusMessage({}), 3000);
      return;
    }
    const conformation = confirm(`Delete ${personToDelete.name} ?`);
    if (conformation) {
      notes
        .httpDelete(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          const status = {
            message: "Phone Number deleted successfully",
            type: "success",
          };
          setStatusMessage(status);
          setTimeout(() => setStatusMessage({}), 3000);
        })
        .catch((err) => {
          const status = {
            message: "This information is already deleted",
            type: "fail",
          };
          setStatusMessage(status);
          setTimeout(() => setStatusMessage({}), 3000);
        });
    }
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
      <Notification message={statusMessage} />
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
        <Persons key={person.id} person={person} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default App;
