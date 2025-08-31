import { TimeInput } from '@heroui/date-input';

export default function Tiempo({ value, Err }) {
  // si no hay value (aún no llega la hora), queda vacío
  const hora = value
    ? {
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds(),
      }
    : null;

  return (
    <div className="w-full">
      <TimeInput
        label="Hora Inicio"
        value={hora}
        granularity="second"
        isReadOnly
        isDisabled
        errorMessage={Err}
        isInvalid={!!Err}
      />
    </div>
  );
}
