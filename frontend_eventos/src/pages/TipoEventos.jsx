// src/pages/TipoEventos.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function TipoEventos() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null);

  const fetch = () => API.get("tipos_evento/").then(r => setTipos(r.data)).catch(console.error);
  useEffect(() => fetch(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.patch(`tipos_evento/${editId}/`, form);
        setEditId(null);
      } else {
        await API.post("tipos_evento/", form);
      }
      setForm({ nombre: "", descripcion: "" });
      fetch();
    } catch (err) {
      console.error(err);
      alert("Error al guardar tipo");
    }
  };

  const handleEdit = (t) => { setForm({ nombre: t.nombre, descripcion: t.descripcion }); setEditId(t.id); }
  const handleDelete = async (t) => {
    if (!confirm(`Eliminar ${t.nombre}?`)) return;
    await API.delete(`tipos_evento/${t.id}/`);
    fetch();
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-dark">Tipos de Evento</h2>

        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-xl shadow">
          <div className="flex gap-3">
            <input required placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}
              className="flex-1 p-3 border rounded" />
            <input placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})}
              className="flex-2 p-3 border rounded" />
            <button className="bg-primary text-white px-4 py-2 rounded">{editId ? "Actualizar" : "Agregar"}</button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tipos.map(t => (
            <motion.div key={t.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold text-lg">{t.nombre}</h3>
              <p className="text-sm text-gray-600">{t.descripcion}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>handleEdit(t)} className="px-3 py-1 bg-yellow-400 rounded">Editar</button>
                <button onClick={()=>handleDelete(t)} className="px-3 py-1 bg-red-500 text-white rounded">Eliminar</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
