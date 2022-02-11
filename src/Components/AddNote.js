import React, { useContext, useState } from "react";
import noteContext from "../Context/Notes/noteContext";

const AddNote = (props) => {
  
    const Context = useContext(noteContext);
    // addNote is taken from notecontext
    const [note, setNote] = useState({title: "",description: "" ,tag: ""});
    const { addNote } = Context;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "",description: "" ,tag: ""})
        props.showAlert("Added Successfully","success")
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
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
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
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
            
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
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
            
          />
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
