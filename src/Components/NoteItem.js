import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium omnis illum sed fugiat voluptates numquam, architecto vero delectus provident. Qui a error nostrum ab deserunt quos. Accusamus magni ad nostrum repellendus laboriosam animi quaerat delectus tempore dolorem similique consectetur eos earum esse dolorum nesciunt ullam accusantium, quae ratione rerum ut!</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
