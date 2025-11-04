import React, { useEffect, useState } from "react";
import axios from "axios";

const TipoEventos = () => {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    // No usar async directamente aquí
    const fetchTipos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tipos/");
        setTipos(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de eventos:", error);
      }
    };

    fetchTipos(); // Llamada inmediata
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Tipos de Eventos</h1>
      <ul className="space-y-3">
        {tipos.map((tipo) => (
          <li
            key={tipo.id}
            className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
          >
            {tipo.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipoEventos;
