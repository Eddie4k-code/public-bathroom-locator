
import { useState } from 'react';
import './App.css';
import { Enter } from './Components/Enter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BathroomsList } from './Components/BathroomList';
import Directions from './Components/Directions';

function App() {
    const [location, setLocation] = useState({});
    const [directionStreet, setDirectionStreet] = useState('');
    const [directionCity, setDirectionCity] = useState('');

  return (
     <div className="App">


          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Enter location={location} setLocation={setLocation} />} />
                  <Route path="/bathrooms" element={<BathroomsList location={location} setDirectionStreet={setDirectionStreet} setDirectionCity={setDirectionCity} directionCity={directionCity} directionStreet={directionStreet} />} />
                  <Route path="/bathrooms/:id" element={<Directions location={location} directionCity={directionCity} directionStreet={directionStreet} />} />
              </Routes>
           </BrowserRouter>


    </div>
  );
}

export default App;
