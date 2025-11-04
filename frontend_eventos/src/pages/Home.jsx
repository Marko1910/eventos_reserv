import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-b from-light to-secondary">
      <motion.h1
        className="text-5xl font-bold text-accent mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bienvenido a Gestión de Eventos
      </motion.h1>
      <motion.p
        className="text-gray-700 text-lg max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Administra tus eventos fácilmente. Crea, edita y elimina registros con una interfaz moderna y responsiva.
      </motion.p>
    </div>
  );
}
