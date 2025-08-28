import { NumberInput } from '@heroui/react';

export default function Number({ nombre, onChange, inputProducidas }) {
  const handleChange = ({ target: { value } }) => {
    if (value !== null && value !== undefined) {
      onChange(value); // convierte en número limpio
    }
  };
  console.log(inputProducidas);
  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        isWheelDisabled
        label={nombre}
        minValue={1}
        maxValue={inputProducidas}
        onChange={handleChange}
      />
    </div>
  );
}
