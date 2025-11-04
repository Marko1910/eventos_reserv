import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import TipoEventos from "./pages/TipoEventos";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/tipos" element={<TipoEventos />} />
        </Routes>
      </div>
    </Router>
  );
}
