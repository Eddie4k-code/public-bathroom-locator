
import { useState } from 'react';
import './App.css';
import { Enter } from './Components/Enter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BathroomsList } from './Components/BathroomList';

function App() {
    const [location, setLocation] = useState({});

  return (
     <div className="App">

    


          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Enter location={location} setLocation={setLocation} />} />
                  <Route path="/bathrooms" element={<BathroomsList location={location} />} />

              </Routes>
           </BrowserRouter>


    </div>
  );
}

export default App;
