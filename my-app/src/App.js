import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
import Home from './Pages/Home';
import Atlas from './Pages/Atlas';
import Eco_atlas from './Pages/Eco_atlas';
import Socially from './Pages/Sociallys';
import Invest from './Pages/InvestCart';
import Resident from './Pages/Residents';
import Eco_card from './Components/Eco_card';
import Nestandart from './Pages/Nestandard_card';
import Territoria from './Components/Terriroria_cadrd';
import Socyal from './Components/Socyal_card';
import Reclam_constructor from './Pages/Reclam_constructor';
import MunicipalRoad from './Pages/Municipal_road';
import './Pages/css/Atlas.css';
import './Pages/css/Home.css';
import './Pages/css/Main.css';
import './Pages/css/Atlas_socially.css';
import './Pages/css/Invest_zone.css';
import './Pages/css/Should.css';
import './Pages/css/Resident.css';
import './Pages/css/Eco_saidbar.css';
import './Pages/css/Eco_card.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route path="/map" element={<Home/>} />
        <Route path="/voting" element={<Atlas/>} />
        <Route path="/atlas" element={<Eco_atlas/>} />
        <Route path="/szo" element={<Socially/>} />
        <Route path="/invest_zone" element={<Invest/>} />
        <Route path="/invest_zone_map" element={<Resident/>} />
        <Route path="/atlas_map" element={<Eco_card/>} />
        <Route path="/trade_obj" element={<Nestandart/>} />
        <Route path="/voting_map" element={<Territoria/>} />
        <Route path="/szo_map" element={<Socyal/>} />
        <Route path="/rec" element={<Reclam_constructor/>} />
        <Route path="/zem_uch" element={<MunicipalRoad/>} />
      </Routes>
    </Router>
  );
}

export default App;