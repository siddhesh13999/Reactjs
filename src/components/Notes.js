import React ,{ useContext, useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
const context = useContext(NoteContext);
const {notes,setNotes, addNote,getNotes,editNote} = context;
const [note, setnote] = useState({id:"",etitle:"",edescription:"", etag:""});
useEffect(() => {
  if(localStorage.getItem('token')){
    getNotes();
  }
  else{
    navigate("/login");
  }
}, [])
const refClose = useRef(null);
const ref = useRef(null);
const onChange = (e)=>{
  setnote({...note, [e.target.name]:e.target.value}); 
}
const updateNote = (currentNote)=>{
  ref.current.click();
  setnote({id:currentNote._id,etitle:currentNote.title,edescription: currentNote.description, etag:currentNote.tag});
}
const handleClick=async(event)=>{
  event.preventDefault();
  editNote(note.id,note.etitle,note.edescription,note.etag);
  refClose.current.click();
  props.showAlert("Updated Successfully","success");
}



  return (
    <>
    <button type="button" ref = {ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
  Launch demo modal
</button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form action="" className="my-3">
      <div className="mb-3">
        <label htmlFor="etitle" className="form-label">
          Edit Title 
        </label>
        <input
          type="text"
          className="form-control"
          id="etitle"
          name='etitle'
          onChange={onChange}
          value={note.etitle}

        />
      </div>
      <div className="mb-3">
        <label htmlFor="edescription" className="form-label">
          Cotents
        </label>
        <textarea
          className="form-control"
          id="edescription"
          rows="3"
          name='edescription'
          onChange={onChange}
          value={note.edescription}
          
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="etag" className="form-label">
          Tag 
        </label>
        <input
          type="text"
          className="form-control"
          id="etag"
          value={note.etag}
          name='etag'
          onChange={onChange}

        />
      </div>
      </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref = {refClose} >Close</button>
            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5|| note.etag.length<5} className="btn btn-primary" onClick={handleClick} >Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
        <h1>Your Notes</h1>  
        <div className="container mx-3">
          {notes.length===0 && "No Notes to display"}
        </div>  
      {notes.map((note)=>{
        return <NoteItem showAlert={props.showAlert} key = {note._id} updateNote = {updateNote} note = {note} />
      })}      
      </div>
      </>
  )
}

export default Notes
