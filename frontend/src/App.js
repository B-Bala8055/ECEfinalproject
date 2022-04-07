import './App.css';
import Navbar from './components/navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import VoterRegistration from './components/voterRegistration/VoterRegistration';
function App() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route exact path='/voter' element={<VoterRegistration/>} />
        </Routes>
    </>
  );
}

export default App;
