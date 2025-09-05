import { Input } from '@heroui/react';

export default function InputText({ onChange }) {
  const handleNumeroChange = (value) => {
    onChange?.(value);
  };
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input label="Observaciones" type="text" onChange={handleNumeroChange} />
    </div>
  );
}
