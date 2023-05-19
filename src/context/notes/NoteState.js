import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =(props )=>{
    const notesInitial = 
        [
            {
              "_id": "64672a2f67be2ecc05f4cd04",
              "title": "My Satsang",
              "description": "Wake up early",
              "tag": "personal",
              "user": "645b9ac8b290af670a0f63a3",
              "date": "2023-05-19T07:50:07.533Z",
              "__v": 0
            },
            {
              "_id": "64672a3f67be2ecc05f4cd06",
              "title": "My Gym",
              "description": "Do pushups ",
              "tag": "personal",
              "user": "645b9ac8b290af670a0f63a3",
              "date": "2023-05-19T07:50:23.439Z",
              "__v": 0
            },
            {
              "_id": "64672a4a67be2ecc05f4cd08",
              "title": "My Gym",
              "description": "Do pushups ",
              "tag": "personal",
              "user": "645b9ac8b290af670a0f63a3",
              "date": "2023-05-19T07:50:34.443Z",
              "__v": 0
            },
            {
              "_id": "64672a4d67be2ecc05f4cd0a",
              "title": "My Gym",
              "description": "Do pushups ",
              "tag": "personal",
              "user": "645b9ac8b290af670a0f63a3",
              "date": "2023-05-19T07:50:37.329Z",
              "__v": 0
            },
            {
              "_id": "64672a4e67be2ecc05f4cd0c",
              "title": "My Gym",
              "description": "Do pushups ",
              "tag": "personal",
              "user": "645b9ac8b290af670a0f63a3",
              "date": "2023-05-19T07:50:38.512Z",
              "__v": 0
            }
          ]
    const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value = {{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;