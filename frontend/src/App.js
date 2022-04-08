import './App.css';
import Navbar from './components/navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import VoterRegistration from './components/voterRegistration/VoterRegistration';
import PartyRegistration from './components/partyRegistration/PartyRegistration';
import VoterPreview from './components/voterPreview/VoterPreview';
function App() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path='/voter' element={<VoterRegistration/>} />
          <Route path='/party' element={<PartyRegistration/>} />
          <Route path='/voterinfo' element={<VoterPreview/>} />
        </Routes>
    </>
  );
}

export default App;
