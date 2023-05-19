import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const a =  useContext(NoteContext);
  // useEffect(()=>{
  //   a.update()
  //   // eslint-disable-next-line
  // },[])
  return (
    <div>
        {console.log(a)}      
    </div>
  )
}

export default About
