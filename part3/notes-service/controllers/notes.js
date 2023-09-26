const Note = require("../models/note");
const notesRouter = require("express").Router();

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  const note = await Note.findById(id);
  note ? response.json(note) : response.status(404).end();
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response, next) => {
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

module.exports = notesRouter;
