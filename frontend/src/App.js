import './App.css';
import Navbar from './components/navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import VoterRegistration from './components/voterRegistration/VoterRegistration';
import PartyRegistration from './components/partyRegistration/PartyRegistration';
function App() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path='/voter' element={<VoterRegistration/>} />
          <Route path='/party' element={<PartyRegistration/>} />
        </Routes>
    </>
  );
}

export default App;
