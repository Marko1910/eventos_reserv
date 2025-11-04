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

  const fetch = () => {
    setLoading(true);
    API.get("eventos/")
      .then(res => setEventos(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEdit = (evento) => {
    setEditData(evento);
    setOpenForm(true);
  };

  const handleDelete = async (evento) => {
    if (!confirm(`Eliminar "${evento.nombre}" ?`)) return;
    try {
      await API.delete(`eventos/${evento.id}/`);
      fetch();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-dark">Eventos</h2>
        <button onClick={handleCreate} className="bg-secondary px-4 py-2 rounded-full">+ Nuevo</button>
      </div>

      {loading && <p>Cargando...</p>}

      <div className="flex flex-wrap gap-6">
        {eventos.map(ev => (
          <EventCard key={ev.id} evento={ev} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <AnimatePresence>
        {openForm && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenForm(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }}
            >
              <EventForm
                initialData={editData}
                onSuccess={() => { setOpenForm(false); fetch(); }}
                onCancel={() => setOpenForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
