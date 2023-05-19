const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//R1 fetch all notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//R2 add a note
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Please enter longer valid description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal server error");
    }
  }
);

//R3 update a note
router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Please enter longer valid description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //create new note object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be updated
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      return res.status(200).json(note);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal server error");
    }
  }
);

//R4 Delete existing note

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //find the note to be deleted and delete it
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json(note ? `${note.title} deleted from notes` : "Error deleteing note");
  } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error")
  }
});
module.exports = router;
