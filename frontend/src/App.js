import './App.css';
import Navbar from './components/navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import VoterRegistration from './components/voterRegistration/VoterRegistration';
import PartyRegistration from './components/partyRegistration/PartyRegistration';
import VoterPreview from './components/voterPreview/VoterPreview';
import Status from './components/status/Status';
function App() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/voter' element={<VoterRegistration/>} />
          <Route path='/party' element={<PartyRegistration/>} />
          <Route path='/voterinfo' element={<VoterPreview/>} />
          <Route path='/status' element={<Status/>} />
        </Routes>
    </>
  );
}

export default App;
