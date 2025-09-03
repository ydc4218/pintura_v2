import { useEffect, useState } from 'react';
import { Select, SelectItem, NumberInput, Button } from '@heroui/react';
import axios from 'axios';
import ConfirmarEliminar from './ConfirmarEliminar';
const apiUrl = import.meta.env.VITE_API_URL;

export default function SelectDefectos({
  nombre,
  onChange,
  inputProducidas,
  value = [],
}) {
  const [opciones, setOpciones] = useState([]);
  const [ordenOriginal, setOrdenOriginal] = useState([]); // 🔹 guardamos orden de la API
  const [cargando, setCargando] = useState(false);
  const [seleccionados, setSeleccionados] = useState(value || []); // [{ id, label, cantidad }]

  const nombreLower = nombre ? nombre.toLowerCase() : '';

  useEffect(() => {
    if (!nombreLower) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        const { data } = await axios.get(`${apiUrl}${nombreLower}`);
        setOpciones(data || []);
        setOrdenOriginal(data || []); // 🔹 guardamos la lista inicial como referencia
      } catch (e) {
        setOpciones([]);
        setOrdenOriginal([]);
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

  const handleEliminarDefecto = (id, label) => {
    setSeleccionados((prev) => prev.filter((d) => d.id !== id));

    // 🔹 reinsertamos el defecto y luego reordenamos según ordenOriginal
    setOpciones((prev) => {
      const nuevasOpciones = [...prev, { key: id, label }];
      return nuevasOpciones.sort(
        (a, b) =>
          ordenOriginal.findIndex((o) => o.key === a.key) -
          ordenOriginal.findIndex((o) => o.key === b.key)
      );
    });
  };

  const handleCantidadChange = (id, cantidad) => {
    setSeleccionados((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              cantidad:
                cantidad === '' || cantidad === null ? null : Number(cantidad),
            }
          : d
      )
    );
  };


  return (
    <div className="flex flex-col gap-2">
      <Select
        className="w-full"
        aria-label="Defectos"
        selectedKeys={[]}
        placeholder={cargando ? 'Cargando...' : 'Seleccione o agregue defecto'}
        disabled={cargando || opciones.length === 0}
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          if (!key) return;

          const opcion = opciones.find((o) => String(o.key) === String(key));
          if (opcion) handleAgregarDefecto(opcion.key, opcion.label);
        }}
      >
        {opciones.map((op) => (
          <SelectItem key={op.key}>{op.label}</SelectItem>
        ))}
      </Select>

      {seleccionados.map((defecto) => (
        <div key={defecto.id} className="flex items-center gap-2">
          <ConfirmarEliminar
            label={defecto.label}
            onConfirm={() => handleEliminarDefecto(defecto.id, defecto.label)}
          />

          <NumberInput
            className="flex-1"
            label={defecto.label}
            size="sm"
            minValue={1}
            maxValue={inputProducidas}
            onChange={(v) => handleCantidadChange(defecto.id, v)}
            isWheelDisabled
          />
        </div>
      ))}
    </div>
  );
}
