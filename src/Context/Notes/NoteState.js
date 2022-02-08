//import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props) => {
    
    const notesInitial= [
        {
          "_id": "61f6a47d9a2092f86eefe23e",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-30T14:45:17.216Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        },
        {
          "_id": "61f7a4ebf84f0a31a2f02032",
          "user": "61f64f644db00d1b89dbdedf",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personnal",
          "date": "2022-01-31T08:59:23.145Z",
          "__v": 0
        }
      ]

      const [notes,setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;