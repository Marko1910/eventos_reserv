// src/pages/Eventos.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import { motion, AnimatePresence } from "framer-motion";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 Obtener lista de eventos desde el backend
  const fetchEventos = async () => {
    setLoading(true);
    try {
      const res = await API.get("eventos/");
      setEventos(res.data);
    } catch (err) {
      console.error("Error al obtener eventos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  // 🔹 Crear nuevo evento
  const handleCreate = () => {
    setEditData(null);
    setOpenForm(true);
  };

  // 🔹 Editar evento existente
  const handleEdit = (evento) => {
    setEditData(evento);
    setOpenForm(true);
  };

  // 🔹 Eliminar evento
  const handleDelete = async (evento) => {
    if (!confirm(`¿Seguro que quieres eliminar "${evento.nombre}"?`)) return;
    try {
      await API.delete(`eventos/${evento.id}/`);
      fetchEventos();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el evento");
    }
  };

  // 🔹 Cuando se guarda o edita correctamente
  const handleSuccess = () => {
    setOpenForm(false);
    fetchEventos();
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-dark">Eventos</h2>
        <button
          onClick={handleCreate}
          className="bg-secondary px-4 py-2 rounded-full hover:opacity-80"
        >
          + Nuevo
        </button>
      </div>

      {loading ? (
        <p>Cargando eventos...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {eventos.map((ev) => (
            <EventCard
              key={ev.id}
              evento={ev}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* 🔹 Modal con animación para formulario */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenForm(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
            >
              <EventForm
                initialData={editData}
                onSuccess={handleSuccess}
                onCancel={() => setOpenForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
