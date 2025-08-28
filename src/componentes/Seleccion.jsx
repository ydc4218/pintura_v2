import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@heroui/react';
import axios from 'axios';

export default function Seleccion({ nombre, onChange, filtro }) {
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState('');

  const nombreLower = nombre ? nombre.toLowerCase() : '';

  // Cargar opciones
  useEffect(() => {
    if (!nombreLower) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        const url = filtro
          ? `http://localhost:3000/api/${nombreLower}?tipo=${filtro}`
          : `http://localhost:3000/api/${nombreLower}`;

        const { data } = await axios.get(url);
        setOpciones(data || []);

        // Limpiar selección si no existe en nuevas opciones
        if (!data.some((item) => item.key === idSeleccionado)) {
          setIdSeleccionado('');
          onChange?.('');
        }
      } catch (e) {
        setOpciones([]);
        setIdSeleccionado('');
        onChange?.('');
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [nombreLower, filtro]);

  const handleChange = (e) => {
    const value = e.target.value;
    setIdSeleccionado(value);
    onChange?.(value);
  };

  return (
    <Select
      selectedKeys={idSeleccionado ? [idSeleccionado] : []}
      value={idSeleccionado}
      label={nombre}
      placeholder={cargando ? 'Cargando...' : `Seleccione ${nombre}`}
      onChange={handleChange}
      disabled={cargando || opciones.length === 0}
    >
      {opciones.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
