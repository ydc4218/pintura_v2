import { useEffect, useState } from 'react';
import { Select, SelectItem, NumberInput } from '@heroui/react';
import axios from 'axios';

export default function SelectDefectos({
  nombre,
  onChange,
  inputProducidas,
  value = [],
}) {
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [seleccionados, setSeleccionados] = useState(value || []); // [{ id, label, cantidad }]

  const nombreLower = nombre ? nombre.toLowerCase() : '';

  useEffect(() => {
    if (!nombreLower) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        const { data } = await axios.get(
          `http://localhost:3000/api/${nombreLower}`
        );
        setOpciones(data || []);
      } catch (e) {
        setOpciones([]);
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [nombreLower]);

  useEffect(() => {
    onChange?.(seleccionados);
  }, [seleccionados]);

  const handleAgregarDefecto = (id, label) => {
    setSeleccionados((prev) => [...prev, { id, label, cantidad: 0 }]);
    setOpciones((prev) => prev.filter((o) => o.key !== id));
  };

  const handleCantidadChange = (id, cantidad) => {
    // Convertimos a número, si no, se vuelve NaN
    const cantidadNum = Number(cantidad) || 0;
    setSeleccionados((prev) =>
      prev.map((d) => (d.id === id ? { ...d, cantidad: cantidadNum } : d))
    );
  };

return (
  <div className="flex flex-col gap-2">
    <Select
      className="w-full"
      aria-label="Defectos"
      selectedKeys={
        seleccionados && seleccionados[0] && seleccionados[0].key != null
          ? [String(seleccionados[0].key)]
          : []
      }
      placeholder={cargando ? 'Cargando...' : 'Seleccione o agregue defecto'}
      disabled={cargando || opciones.length === 0}
      onSelectionChange={(keys) => {
        const key = Array.from(keys)[0];

        if (!key) {
          setSeleccionados([]);
          return;
        }

        const opcion = opciones.find((o) => String(o.key) === String(key));
        if (opcion) handleAgregarDefecto(opcion.key, opcion.label);
      }}
    >
      {opciones.map((op) => (
        <SelectItem key={op.key}>{op.label}</SelectItem>
      ))}
    </Select>

    {seleccionados.map((defecto) => (
      <NumberInput
        className="w-full"
        key={defecto.id}
        label={defecto.label}
        minValue={0}
        maxValue={inputProducidas}
        onChange={(v) => handleCantidadChange(defecto.id, v)}
        isWheelDisabled
      />
    ))}
  </div>
);
}