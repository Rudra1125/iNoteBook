import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (

    <div className="col-md-3">
      
      <div className="card my-3 bg-success text-white">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} </p>
          <div className="d-flex flex-row-reverse"> 
            <i className="fas fa-edit mx-2 text-secondary" onClick = {()=>{updateNote(note)}}></i>
            <i className="fas fa-trash mx-2 text-danger" onClick = {()=>{deleteNote(note._id); props.showAlert("Deleted Successfully ","success")}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
