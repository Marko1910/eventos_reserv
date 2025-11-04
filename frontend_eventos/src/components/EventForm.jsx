// src/components/EventForm.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function EventForm({ initialData = null, onSuccess, onCancel }) {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    lugar: "",
    costo: "",
    tipo_evento_id: "",
    descripcion: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("tipos_evento/")
      .then(res => setTipos(res.data))
      .catch(console.error);

    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        fecha: initialData.fecha ? initialData.fecha.replace("Z", "") : "",
        lugar: initialData.lugar || "",
        costo: initialData.costo || "",
        tipo_evento_id: initialData.tipo_evento?.id || "",
        descripcion: initialData.descripcion || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("nombre", form.nombre);
      data.append("fecha", form.fecha);
      data.append("lugar", form.lugar);
      data.append("costo", form.costo);
      data.append("tipo_evento_id", form.tipo_evento_id);
      data.append("descripcion", form.descripcion);
      if (file) data.append("imagen", file);

      if (initialData && initialData.id) {
        await API.patch(`eventos/${initialData.id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("eventos/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar el evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl"
    >
      <div className="grid grid-cols-1 gap-3">
        <input name="nombre" value={form.nombre} onChange={handleChange}
          className="p-3 border rounded-lg" placeholder="Nombre del evento" required />
        <input name="fecha" value={form.fecha} onChange={handleChange}
          type="datetime-local" className="p-3 border rounded-lg" required />
        <input name="lugar" value={form.lugar} onChange={handleChange}
          className="p-3 border rounded-lg" placeholder="Lugar" required />
        <input name="costo" value={form.costo} onChange={handleChange}
          type="number" step="0.01" className="p-3 border rounded-lg" placeholder="Costo" required />
        <select name="tipo_evento_id" value={form.tipo_evento_id} onChange={handleChange}
          className="p-3 border rounded-lg" required>
          <option value="">Selecciona tipo</option>
          {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
        </select>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
          className="p-3 border rounded-lg" placeholder="Descripción" rows={3} />
        <input type="file" accept="image/*" onChange={handleFile} />
        <div className="flex gap-3 justify-end mt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border">Cancelar</button>
          <button type="submit" disabled={loading}
            className="px-4 py-2 rounded-lg bg-primary text-white">
            {loading ? "Guardando..." : (initialData ? "Actualizar" : "Crear")}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
