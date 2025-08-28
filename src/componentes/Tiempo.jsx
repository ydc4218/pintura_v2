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
  const [horaInicio] = useState(getHoraActual()); // inicio fijo

  return (
    <div className="flex flex-col gap-4">
      <TimeInput
        label="Hora Inicio"
        value={horaInicio}
        onChange={onChange}
        granularity="second"
        isReadOnly
      />
    </div>
  );
}
