import React, { useState, useEffect } from 'react';
import { useNavigate ,BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './Components/Home';
import Sura from "./Components/Sura"
const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/Holy-Scripture-Website' element={<Home/>}> </Route>
      <Route path="/Surah/:id" element={<Sura />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
};

export default App;

