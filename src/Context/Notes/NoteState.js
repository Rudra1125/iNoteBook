//import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props) => {
    
    const notesInitial= [
        {
          "_id": "61f6a47d9a2092f86eefe232e",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-30T14:45:17.216Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f032032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f012032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f021032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f020322",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f020321",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        }
      ]

      const [notes,setNotes] = useState(notesInitial);
      // Add a note
      const addNote = (title, description, tag) => {
        // todo api call
        console.log("Adding a new note")
        const note = {
          "_id": "61f7a4ebf84f0a31a2f020232",
          "user": "61f64f644db00d1b89dbdedf",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      // Delete a Note
      const deleteNote = (id) => {
        console.log("Deleting the node with id"+ id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }
       

      // Edit a note

      const editNote = () => {

      }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote , editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;