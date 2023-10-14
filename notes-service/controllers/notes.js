const jwt = require("jsonwebtoken");

const Note = require("../models/note");
const User = require("../models/user");
const notesRouter = require("express").Router();

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const note = await Note.findById(id);
  note ? response.json(note) : response.status(404).end();
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { content, important } = request.body;

  const note = {
    content,
    important,
  };

  const updatedNote = await Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.json(updatedNote);
});

notesRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;

  const result = await Note.findByIdAndRemove(id);
  result ? response.status(204).end() : response.status(404).end();
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  console.log("Estoy por devolver null en getTokenFrom")
  return null;
};

module.exports = notesRouter;
