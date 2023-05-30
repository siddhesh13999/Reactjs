import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =(props )=>{
  const host = "http://localhost:8000";
  let notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  const getNotes = async()=>{
    //API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        'auth-token' : localStorage.getItem('token')
      }  
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json);
  }
        
    const addNote = async(title,description,tag)=>{
      //API
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          'auth-token' : localStorage.getItem("token")
        },  
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      // console.log("Add note()");
      // const note ={
      //   "_id": "64672a4e67be2ecc05f4cd0c4",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "user": "645b9ac8b290af670a0f63a3",
      //   "date": "2023-05-19T07:50:38.512Z",
      //   "__v": 0
      // }
      let newNote =JSON.parse(JSON.stringify(json)) ;
       setNotes(notes.concat(newNote));
    }
    const editNote = async(id, title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          'auth-token' : localStorage.getItem("token")
        },  
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id==id){
          newNotes[index].title =title;
          newNotes[index].description =description;
          newNotes[index].tag =tag;
          break;
        }
      }
      console.log(newNotes);
      setNotes(newNotes);
    }

      
    
    const deleteNote = async(id)=>{
      //API CALLS
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, { 
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          'auth-token' : localStorage.getItem("token")
        }
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);      
      
      // console.log(`deleteing note with id ${id}`);
      let newNotes = notes.filter((note)=>{return note._id !==id});
      setNotes(newNotes)
    }
    return(
        <NoteContext.Provider value = {{notes,setNotes,addNote,deleteNote,getNotes,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;