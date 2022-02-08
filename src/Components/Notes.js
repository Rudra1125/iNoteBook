import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = () => {
  // using use context we we will fetch the notes
  // and it will save us from component drilling.
  // This will make the app effiecient.
  const context = useContext(noteContext)
  const {notes} =context;
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h1>your notes</h1>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
