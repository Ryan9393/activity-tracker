import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.js";
import AddDelTasks from './Pages/AddDelTasks.js';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/AddDelTasks" element={<AddDelTasks />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
