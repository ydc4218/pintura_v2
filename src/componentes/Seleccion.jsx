import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@heroui/react';
import axios from 'axios';

export default function Seleccion({ nombre, onChange }) {
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!nombre) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        // Cambia la URL por la de tu servidor Node o API real
        const { data } = await axios.get(`http://localhost:3000/api/${nombre}`);
        setOpciones(data);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setOpciones([]);
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [nombre]);

  return (
    <Select
      className="flex flex-col gap-4"
      label={cargando ? 'Cargando...' : `Seleccione ${nombre}`}
      placeholder={cargando ? '...' : `Selecciona un ${nombre}`}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {opciones.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
