/*
Purpose: Implement full CRUD endpoints for Notes
*/

const express = require("express");
const router = express.Router();
const NotesModel = require("../models/NotesModel");

// 1. POST /api/notes - Create a new Note
router.post("/notes", async (request, response) => {
  // Accommodate flat JSON body or body wrapped inside request.body.content
  const body = request.body.content || request.body;

  if (!body.noteTitle || !body.noteDescription) {
    return response.status(400).send({
      message: "Note title and description cannot be empty",
    });
  }

  try {
    const note = new NotesModel({
      noteTitle: body.noteTitle,
      noteDescription: body.noteDescription,
      priority: body.priority || "MEDIUM",
      dateAdded: body.dateAdded || Date.now(),
      dateUpdated: body.dateUpdated || Date.now(),
    });

    const savedNote = await note.save();
    return response.status(201).send(savedNote);
  } catch (error) {
    return response.status(500).send({
      message: error.message || "Some error occurred while creating the note",
    });
  }
});

// 2. GET /api/notes - Retrieve all Notes
router.get("/notes", async (request, response) => {
  try {
    const notes = await NotesModel.find();
    return response.status(200).send(notes);
  } catch (error) {
    return response.status(500).send({
      message: error.message || "Some error occurred while retrieving notes",
    });
  }
});

// 3. GET /api/notes/:noteId - Retrieve a single Note by ID
router.get("/notes/:noteId", async (request, response) => {
  try {
    const note = await NotesModel.findById(request.params.noteId);
    if (!note) {
      return response.status(404).send({
        message: "Note not found with id " + request.params.noteId,
      });
    }
    return response.status(200).send(note);
  } catch (error) {
    return response.status(500).send({
      message: "Error retrieving note with id " + request.params.noteId,
    });
  }
});

// 4. PUT /api/notes/:noteId - Update a Note by ID
router.put("/notes/:noteId", async (request, response) => {
  const body = request.body.content || request.body;

  if (!body.noteTitle && !body.noteDescription && !body.priority) {
    return response.status(400).send({
      message: "Note content to update cannot be empty",
    });
  }

  try {
    const updateData = {
      dateUpdated: Date.now(),
    };
    if (body.noteTitle) updateData.noteTitle = body.noteTitle;
    if (body.noteDescription) updateData.noteDescription = body.noteDescription;
    if (body.priority) updateData.priority = body.priority;

    const updatedNote = await NotesModel.findByIdAndUpdate(
      request.params.noteId,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedNote) {
      return response.status(404).send({
        message: "Note not found with id " + request.params.noteId,
      });
    }
    return response.status(200).send(updatedNote);
  } catch (error) {
    return response.status(500).send({
      message: "Error updating note with id " + request.params.noteId,
    });
  }
});

// 5. DELETE /api/notes/:noteId - Delete a Note by ID
router.delete("/notes/:noteId", async (request, response) => {
  try {
    const deletedNote = await NotesModel.findByIdAndDelete(
      request.params.noteId,
    );
    if (!deletedNote) {
      return response.status(404).send({
        message: "Note not found with id " + request.params.noteId,
      });
    }
    return response.status(200).send({
      message: "Note deleted successfully!",
    });
  } catch (error) {
    return response.status(500).send({
      message: "Could not delete note with id " + request.params.noteId,
    });
  }
});

module.exports = router;
