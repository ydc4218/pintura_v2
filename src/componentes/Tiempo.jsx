import { useState, useEffect } from 'react';
import { TimeInput } from '@heroui/date-input';
import { Input } from '@heroui/input';

const getHoraActual = () => {
  const date = new Date();
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

export default function Tiempo({ onChange }) {
  const [horaInicio, setHoraInicio] = useState(getHoraActual());
  const [horaFin, setHoraFin] = useState(getHoraActual());
  const [duracion, setDuracion] = useState('');

  const calcularDuracion = (inicio, fin) => {
    const inicioSeg = inicio.hour * 3600 + inicio.minute * 60 + inicio.second;
    const finSeg = fin.hour * 3600 + fin.minute * 60 + fin.second;
    let diff = finSeg - inicioSeg;
    if (diff < 0) diff += 24 * 3600;

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    const d = calcularDuracion(horaInicio, horaFin);
    setDuracion(d);
    if (onChange) {
      onChange({
        horaInicio,
        horaFin,
        duracion: d,
      });
    }
  }, [horaInicio, horaFin]);

  return (
    <div className="flex flex-col gap-4">
      <TimeInput
        label="Hora Inicio"
        value={horaInicio}
        onChange={setHoraInicio}
        granularity="second"
      />
      <TimeInput
        label="Hora Final"
        value={horaFin}
        onChange={setHoraFin}
        granularity="second"
      />
      <Input label="Duración" value={duracion} isReadOnly />
    </div>
  );
}
