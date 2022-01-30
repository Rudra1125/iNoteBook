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

// Route 3: 
// Update an exsisting Note
// Post "/api/Notes/updatenote" Login required 

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
  const {title,description,tag}=req.body;
  // Create a newNote Object
  const newNote = {};
  if(title){
    newNote.title = title;
  }
  if(description){
    newNote.description = description ;
  }
  if(tag){
    newNote.tag = tag;
  }
  // here new note object has been built
  // find the note to be updated or update it
  
  let note = await Notes.findById(req.params.id);
  
  // if note is present or not then we use this check
  if(!note){
    return res.status(404).send("Not Found");
  }
  //  if some one else want to access then we use this check
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
  res.json({note});

});
module.exports = router;
