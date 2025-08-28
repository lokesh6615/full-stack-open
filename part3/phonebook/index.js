const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PORT = 3001;
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

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(
  morgan((tokens, req, res) => {
    if (req.method === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms",
        tokens.body(req, res),
      ].join(" ");
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

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
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  if (data.find((person) => person.name === req.body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
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
