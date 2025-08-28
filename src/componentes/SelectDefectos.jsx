import { useEffect, useState } from 'react';
import { Select, SelectItem, Input, NumberInput } from '@heroui/react';
import axios from 'axios';

export default function SelectDefectos({ nombre, onChange, filtro, inputProducidas }) {
  const [inputs, setInputs] = useState([]); // lista de inputs creados
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState('');

  const nombreLower = nombre ? nombre.toLowerCase() : '';

  useEffect(() => {
    if (!nombreLower) return;

    const fetchDatos = async () => {
      try {
        setCargando(true);
        const url = `http://localhost:3000/api/${nombreLower}`;

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

  const handleSelectionChange = (e) => {
    const seleccionado = e.target.value; // último seleccionado

    const opcion = opciones.find(
      (op) => String(op.key) === String(seleccionado)
    );

    if (opcion) {
      // Crear input
      setInputs((prev) => [...prev, opcion]);

      // Eliminar del selector
      setOpciones((prev) => prev.filter((op) => op.key !== opcion.key));
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Select
        selectedKeys={idSeleccionado ? [idSeleccionado] : []}
        label="Defecto "
        placeholder="Elige..."
        onChange={handleSelectionChange}
      >
        {opciones.map((op) => (
          <SelectItem key={op.key}>{op.label}</SelectItem>
        ))}
      </Select>

      {/* Inputs creados dinámicamente */}
      {inputs.map((op) => (
        <NumberInput
          key={op.key}
          isWheelDisabled
          minValue={1}
          label={`${op.label}`}
          maxValue={inputProducidas}
        />
      ))}
    </div>
  );
}
