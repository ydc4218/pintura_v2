import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@heroui/react';
import axios from 'axios';

export default function Seleccion({ nombre, onChange, filtro, excluir = [], Disabled, Err }) {
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState('');

  const nombreLower = nombre ? nombre.toLowerCase() : '';

  useEffect(() => {
    if (!nombreLower) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        const params = new URLSearchParams();
        if (filtro) params.append('tipo', filtro);
        if (excluir.length > 0) params.append('excluir', excluir.join(','));
        const url = `http://localhost:3000/api/${nombreLower}?${params.toString()}`;

        const { data } = await axios.get(url);
        setOpciones(data || []);
        // ⚡ NO limpiar idSeleccionado automáticamente
      } catch {
        setOpciones([]);
        setIdSeleccionado('');
        onChange?.('');
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [nombreLower, filtro, JSON.stringify(excluir)]);

  const handleSelectionChange = (keys) => {
    const value = Array.from(keys)[0] || '';
    setIdSeleccionado(value);
    onChange?.(value);
  };

  return (
    <Select
      selectedKeys={idSeleccionado ? [idSeleccionado] : []}
      label={nombre}
      errorMessage={Err}
      isInvalid={!!Err}
      isDisabled={Disabled === null}
      placeholder={cargando ? 'Cargando...' : `Seleccione ${nombre}`}
      onSelectionChange={handleSelectionChange}
      disabled={cargando || opciones.length === 0}
    >
      {opciones.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
  );
}
