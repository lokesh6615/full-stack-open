const express = require("express");
const app = express();
const PORT = 3000;
let data = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`Phonebook has info for ${data.length} people
    ${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personData = data.find((person) => person.id === id);
  if (!personData) res.status(404).send(`person with id ${id} not found`);
  res.json(personData);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personData = data.find((person) => person.id === id);
  if (!personData) res.status(404).send(`person with id ${id} not found`);
  data = data.filter((person) => person.id != id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const newPerson = {
    id: Math.floor(Math.random() * 100),
    name: req.body.name,
    number: req.body.number,
  };
  data = data.concat(newPerson);
  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
