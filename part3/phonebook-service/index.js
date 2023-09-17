const express = require("express");
const morgan = require("morgan");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
morgan.token("bodyData", (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] :response-time ms :bodyData"));

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.get("/api/info", (req, res) => {
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Person not found in db");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = persons.findIndex((person) => person.id === id);
  if (idx !== -1) {
    persons.splice(idx, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Person not found in db");
  }
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "info missing",
    });
  }

  const nameExists = persons.find((person) => person.name === name);
  if (nameExists) {
    return res.status(400).json({
      error: `Person ${name} already exists`,
    });
  }

  const newPerson = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
