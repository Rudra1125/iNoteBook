import React, { useContext, useState } from "react";
import noteContext from "../Context/Notes/noteContext";

const AddNote = () => {

    const Context = useContext(noteContext);
    // addNote is taken from notecontext
    const [note, setNote] = useState({title: "",description: "" ,tag: ""});
    const { addNote } = Context;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onChange = (e) => {
        // here we are using spread property 
        //  In this whatever property is present will be there and the overeride or add the new one
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title 
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
