const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1
//  this is used to fetch all notes of those user which are already login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  //  here we are fetching notes of the user
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

// Route 2:
// Thi s is a route of adding notes
// using POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  // feching Notes data and adding restriction
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //   here we are checking if the notes doesn't have these errors then we add else we throw error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Here we are taking title decription by creating a Notes object
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

module.exports = router;
