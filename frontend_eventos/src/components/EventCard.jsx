// src/components/EventCard.jsx
import { motion } from "framer-motion";

export default function EventCard({ evento, onEdit, onDelete }) {
  const img = evento.imagen || "/placeholder.png"; // pon un placeholder en public/
  const tipoNombre = evento.tipo_evento?.nombre || "—";

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition w-80"
      whileHover={{ scale: 1.03 }}
    >
      <div className="h-48 w-full bg-gray-100">
        <img
          src={img}
          alt={evento.nombre}
          className="h-48 w-full object-cover"
          onError={(e) => { e.target.src = "/placeholder.png"; }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-dark">{evento.nombre}</h3>
        <p className="text-gray-600">{tipoNombre} • {evento.lugar}</p>
        <p className="text-sm text-gray-400">{new Date(evento.fecha).toLocaleString()}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary font-semibold">S/. {evento.costo}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit && onEdit(evento)}
              className="px-3 py-1 rounded-lg bg-yellow-400 text-sm font-medium"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete && onDelete(evento)}
              className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-medium"
            >
              Elim
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
