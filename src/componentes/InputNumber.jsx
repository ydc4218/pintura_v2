import { useState } from 'react';
import { NumberInput } from '@heroui/react';

export default function InputNumber({ Disabled, Err, onChange }) {
  const [numero, setNumero] = useState('');
  const [adicional, setAdicional] = useState('');

  const buildValue = (num, add) => {
    if (num && add) return `${num}-${add}`;
    if (num) return num;
    if (add) return add;
    return '';
  };

  const handleNumeroChange = (value) => {
    setNumero(value);
    onChange?.(buildValue(value, adicional));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setAdicional(value);
    onChange?.(buildValue(numero, value));
  };

  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        isWheelDisabled
        isDisabled={Disabled === null}
        errorMessage={Err}
        isInvalid={!!Err}
        onChange={handleNumeroChange}
        minValue={1}
        endContent={
          <div className="flex items-center">
            <label className="sr-only" htmlFor="adicional">
              Adicional
            </label>
            <select
              aria-label="Select adicional"
              className="outline-none border-0 bg-transparent"
              id="adicional"
              name="adicional"
              value={adicional}
              onChange={handleSelectChange}
            >
              <option value="">--</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
              <option value="posventa">posventa</option>
            </select>
          </div>
        }
        label="Lote"
        placeholder="Ingrese el número de lote"
      />
    </div>
  );
}
