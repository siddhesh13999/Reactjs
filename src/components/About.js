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
        {/* {console.log(a)}       */}
        <h1>this is about</h1>
    </div>
  )
}

export default About
