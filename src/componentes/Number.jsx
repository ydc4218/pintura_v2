import { NumberInput } from '@heroui/react';

export default function Number({ nombre, onChange, Disabled, Err }) {
  const handleChange = ({ target: { value } }) => {
    if (value !== null && value !== undefined) {
      onChange(value); // convierte en número limpio
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        isWheelDisabled
        isDisabled={Disabled}
        errorMessage={Err}
        isInvalid={!!Err}
        label={nombre}
        minValue={1}
        onChange={handleChange}
      />
    </div>
  );
}
