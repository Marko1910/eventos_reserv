import { useEffect, useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TipoEventos() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Cargar los tipos desde el backend
  const fetchTipos = async () => {
    try {
      const response = await API.get("tipos_evento/");
      setTipos(response.data);
    } catch (error) {
      console.error("Error al cargar tipos:", error);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  // ✅ Guardar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.patch(`tipos_evento/${editId}/`, form);
      } else {
        await API.post("tipos_evento/", form);
      }
      setForm({ nombre: "", descripcion: "" });
      setEditId(null);
      setShowModal(false);
      fetchTipos();
    } catch (error) {
      console.error("Error al guardar tipo:", error);
      alert("Error al guardar tipo");
    }
  };

  // ✅ Editar
  const handleEdit = (tipo) => {
    setForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setEditId(tipo.id);
    setShowModal(true);
  };

  // ✅ Eliminar
  const handleDelete = async (tipo) => {
    if (!confirm(`¿Eliminar "${tipo.nombre}"?`)) return;
    try {
      await API.delete(`tipos_evento/${tipo.id}/`);
      fetchTipos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Tipos de Evento
        </h2>

        {/* ➕ Formulario para agregar nuevo tipo */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3"
        >
          <input
            required
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="flex-1 p-3 border rounded"
          />
          <input
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="flex-1 p-3 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            {editId ? "Actualizar" : "Agregar"}
          </button>
        </form>

        {/* 🗂️ Lista de tipos */}
        {tipos.length === 0 ? (
          <p className="text-center text-gray-600">No hay tipos registrados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tipos.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-xl shadow"
              >
                <h3 className="font-semibold text-lg">{t.nombre}</h3>
                <p className="text-sm text-gray-600">{t.descripcion}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 🪟 Modal de edición */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4">
                Editar Tipo de Evento
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  required
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="p-3 border rounded"
                />
                <textarea
                  placeholder="Descripción"
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                  className="p-3 border rounded"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditId(null);
                    }}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
