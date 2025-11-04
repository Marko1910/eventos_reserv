// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="bg-primary text-white py-4 px-8 shadow-lg flex justify-between items-center"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold tracking-wide">🎉 Gestión de Eventos</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-secondary transition">Inicio</Link>
        <Link to="/eventos" className="hover:text-secondary transition">Eventos</Link>
        <Link to="/tipos" className="hover:text-secondary transition">Tipos</Link>
      </div>
    </motion.nav>
  );
}
