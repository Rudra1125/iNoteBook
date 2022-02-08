//import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  // We will not add notes randomly we will get it for fetch api
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    // todo api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNjRmNjQ0ZGIwMGQxYjg5ZGJkZWRmIn0sImlhdCI6MTY0MzU0Mjc0Nn0.Hog2GMEpJqjagG1oludHrh2WHl6b2UuyzTDY9kGL0Gg",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNjRmNjQ0ZGIwMGQxYjg5ZGJkZWRmIn0sImlhdCI6MTY0MzU0Mjc0Nn0.Hog2GMEpJqjagG1oludHrh2WHl6b2UuyzTDY9kGL0Gg",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a new note");
    const note = {
      _id: "61f7a4ebf84f0a31a2f020232",
      user: "61f64f644db00d1b89dbdedf",
      title: title,
      description: description,
      tag: tag,
      date: "2022-01-31T08:59:23.145Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNjRmNjQ0ZGIwMGQxYjg5ZGJkZWRmIn0sImlhdCI6MTY0MzU0Mjc0Nn0.Hog2GMEpJqjagG1oludHrh2WHl6b2UuyzTDY9kGL0Gg",
      },
    });
    const json = response.json();
    console.log(json);
    console.log("Deleting the node with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNjRmNjQ0ZGIwMGQxYjg5ZGJkZWRmIn0sImlhdCI6MTY0MzU0Mjc0Nn0.Hog2GMEpJqjagG1oludHrh2WHl6b2UuyzTDY9kGL0Gg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await  response.json();
    console.log(json); 
    //  logic to edit in client
    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
