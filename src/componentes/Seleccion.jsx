import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@heroui/react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export default function Seleccion({
  nombre,
  onChange,
  filtro,
  excluir = [],
  Disabled,
  Err,
  value = '', // 🔹 lo recibimos desde el padre
}) {
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  const nombreLower = nombre ? nombre.toLowerCase() : '';

  useEffect(() => {
    if (!nombreLower) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        const params = new URLSearchParams();
        if (filtro) params.append('tipo', filtro);
        if (excluir.length > 0) params.append('excluir', excluir.join(','));
        const url = `${apiUrl}${nombreLower}?${params.toString()}`;

        const { data } = await axios.get(url);
        setOpciones(data || []);
      } catch {
        setOpciones([]);
        onChange?.('');
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [nombreLower, filtro, JSON.stringify(excluir)]);

  const handleSelectionChange = (keys) => {
    const value = Array.from(keys)[0] || '';
    onChange?.(value);
  };

  return (
    <Select
      selectedKeys={value ? [value] : []} // 🔹 usar `value` desde el padre
      label={nombre}
      errorMessage={Err}
      defaultSelectedKeys={[]} // 🔹 ya no es necesario
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
