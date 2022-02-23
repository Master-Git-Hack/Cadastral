import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import "./App.css";
import Homologaciones from "./interface/Homologaciones";
import Catastral from "./interface/Catastral";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container container-fluid mt-5">
        <Routes>
          <Route path="/" element={<Catastral />} />
          <Route path="/avaluos" element={<Catastral />} />
          <Route path="/homologaciones" element={<Homologaciones />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
