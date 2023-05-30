import React, { useContext, useState } from 'react'
import Notes from './Notes'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
  const context   = useContext(NoteContext);
  const {addNote} = context;
  const [note, setnote] = useState({title:"",description:"", tag:""})

  const handleClick=async(event)=>{
    event.preventDefault();
    // console.log(note.title)
    setnote({title:"",description:"", tag:""});
    await addNote(note.title,note.description,note.tag);
    props.showAlert("Note Added Succesfully","success");
  }
  const onChange = (e)=>{
     setnote({...note, [e.target.name]:e.target.value}); 
    
  }
  return (
    <div className="container col-md-6 col-md-offset-6">
      <h1>Add a Note</h1>
      <form action="" className="my-3">
      <div className=" mb-3">
        <label htmlFor="title" className="form-label">
          Title 
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Title"
          name='title'
          value={note.title}
          onChange={onChange}

        />
      </div>
      <div className="w-100  mb-3">
        <label htmlFor="description" className="form-label">
          Cotents
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="6"
          name='description'
          value={note.description}
          onChange={onChange}
          placeholder='Start typing your note'
        ></textarea>
      </div>
      <div className="w-100 mb-3">
        <label htmlFor="tag" className="form-label">
          Tag 
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          placeholder="Tag"
          name='tag'
          value={note.tag}
          onChange={onChange}

        />
      </div>
      <button disabled={note.title.length <5 || note.description.length<5 || note.tag.length<5} className="btn btn-warning" onClick={handleClick} >Add Note</button>
      </form>
      
    </div>
  )
}

export default AddNote
