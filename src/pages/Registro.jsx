import { useState } from 'react';
import Tiempo from '../componentes/Tiempo';
import Seleccion from '../componentes/Seleccion';
import { Button } from '@heroui/react';

export default function Registro() {
  const [datosTiempo, setDatosTiempo] = useState(null);
  const [categoria, setCategoria] = useState('Modelo'); // Cambia por frutas, etc.
  const [seleccionado, setSeleccionado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del tiempo:', datosTiempo);
    // Aquí ya puedes hacer un fetch o axios para enviarlo al backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 flex flex-col gap-4"
    >
      <div className="w-full">
        <Tiempo onChange={setDatosTiempo} />
      </div>

      <div className="w-full">
        <Seleccion nombre={categoria} onChange={setSeleccionado} />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </Button>
    </form>
  );
}
