import './App.css';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import VoterRegistration from './components/voterRegistration/VoterRegistration';
function App() {
  return (
    <>
        <Navbar/>
        <Router>
          <Routes>
            <Route exact path='/voter' element={<VoterRegistration/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
