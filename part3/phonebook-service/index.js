const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());

morgan.token("bodyData", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :bodyData"
  )
);

app.get("/api/info", (req, res) => {
  const date = new Date();
  Person.countDocuments({}).then((numberOfPerons) => {
    res.send(`
      <p>Phonebook has info for ${numberOfPerons} people</p>
      <p>${date}</p>
    `);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).send("Person not found in db");
    }
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "info missing",
    });
  }

  /* const nameExists = persons.find((person) => person.name === name);
  if (nameExists) {
    return res.status(400).json({
      error: `Person ${name} already exists`,
    });
  } */

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then((person) => {
    res.json(newPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
