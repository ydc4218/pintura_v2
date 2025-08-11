import { useState } from 'react';
import Tiempo from '../componentes/Tiempo';
import Seleccion from '../componentes/Seleccion';

export default function Registro() {
  const [datosTiempo, setDatosTiempo] = useState(null);
  const [categoria, setCategoria] = useState('animales'); // Cambia por frutas, etc.
  const [seleccionado, setSeleccionado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del tiempo:', datosTiempo);
    // Aquí ya puedes hacer un fetch o axios para enviarlo al backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <Tiempo onChange={setDatosTiempo} />
      <Seleccion nombre={categoria} onChange={setSeleccionado} />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>
    </form>
  );
}
