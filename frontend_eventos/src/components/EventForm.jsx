// src/components/EventForm.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function EventForm({ initialData, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    costo: "",
    tipo_evento_id: "",
    imagen: null
  });

  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    API.get("tipos_evento/")
      .then(res => setTipos(res.data))
      .catch(console.error);

    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || "",
        fecha: initialData.fecha || "",
        lugar: initialData.lugar || "",
        costo: initialData.costo || "",
        tipo_evento_id: initialData.tipo_evento?.id || "",
        imagen: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setForm({ ...form, imagen: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      if (initialData) {
        await API.patch(`eventos/${initialData.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await API.post("eventos/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      onSuccess();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error al guardar el evento");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-[420px]">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? "Editar Evento" : "Nuevo Evento"}
      </h3>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full p-2 border rounded mb-3"
        required
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        name="lugar"
        value={form.lugar}
        onChange={handleChange}
        placeholder="Lugar"
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="number"
        step="0.01"
        name="costo"
        value={form.costo}
        onChange={handleChange}
        placeholder="Costo"
        className="w-full p-2 border rounded mb-3"
        required
      />

      <select
        name="tipo_evento_id"
        value={form.tipo_evento_id}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      >
        <option value="">Selecciona un tipo</option>
        {tipos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre}
          </option>
        ))}
      </select>

      <input
        type="file"
        name="imagen"
        onChange={handleChange}
        accept="image/*"
        className="w-full mb-3"
      />

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {initialData ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
