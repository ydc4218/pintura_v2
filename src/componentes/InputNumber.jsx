import { NumberInput } from '@heroui/react';

export default function InputNumber({ Disabled, Err, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        isWheelDisabled
        isDisabled={Disabled === null}
        errorMessage={Err}
        isInvalid={!!Err}
        onChange={onChange}
        minValue={1}
        endContent={
          <div className="flex items-center">
            <label className="sr-only" htmlFor="currency">
              Currency
            </label>
            <select
              aria-label="Select adicional"
              className="outline-solid outline-transparent border-0 bg-transparent "
              id="adicional"
              name="adicional"
            >
              <option aria-label="a" value="a"></option>
              <option aria-label="a" value="a">
                a
              </option>
              <option aria-label="b" value="b">
                b
              </option>
              <option aria-label="c" value="c">
                c
              </option>
              <option aria-label="d" value="d">
                d
              </option>
              <option aria-label="pos" value="posventa">
                posventa
              </option>
            </select>
          </div>
        }
        label="Lote"
        placeholder="Ingrese el numero de lote"
      />
    </div>
  );
}
