import React from "react";

const NoteItem = (props) => {
  const note = props.note;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
          {note.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam optio laudantium enim, cupiditate repellendus dicta, architecto numquam expedita, ad consectetur impedit dolores quam ea quod quos iure? Aliquid recusandae aspernatur possimus assumenda eos atque.
          </p>
          <a href="#" className="btn btn-primary">
            Access
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default NoteItem;
