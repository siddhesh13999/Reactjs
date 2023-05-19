import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <>  
    <NoteState>
    <Router>    
    <Navbar/>
    <div className="container">
    <Routes>
    <Route path = '/home' element = {<Home/>} />
    <Route path = '/about' element = {<About/>} />
    </Routes>
    </div>
    </Router>    
    </NoteState>
    </>
  );
}

export default App;
