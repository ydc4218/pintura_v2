import { useState } from 'react';
import Tiempo from '../componentes/Tiempo';
import Seleccion from '../componentes/Seleccion';
import { Button } from '@heroui/react';
import InputNumber from '../componentes/InputNumber';
import SelectDefectos from '../componentes/SelectDefectos';
import Number from '../componentes/Number';

export default function Registro() {
  const [datosTiempo, setDatosTiempo] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  const [seleccionModelo, setSeleccionModelo] = useState('');
  const [seleccionTipo, setSeleccionTipo] = useState('');

  // La primera pieza se maneja igual que antes
  const [seleccionParte, setSeleccionParte] = useState('');
  const [seleccionColor, setseleccionColor] = useState('');
  const [inputConforme, setinputConforme] = useState('');
  const [inputProducidas, setinputProducidas] = useState(0);

  // Piezas adicionales (máximo 2 extras)
  const [piezas, setPiezas] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      tiempo: datosTiempo,
      modelo: seleccionModelo,
      tipo: seleccionTipo,
      cantidad,
      piezaPrincipal: {
        parte: seleccionParte,
        color: seleccionColor,
        producidas: inputProducidas,
        conforme: inputConforme,
      },
      piezasExtras: piezas,
    });
  };

  const handleModeloChange = (valor) => {
    setSeleccionModelo(valor);
    setSeleccionTipo('');
    setSeleccionParte('');
    setPiezas([]);
  };

  const handleTipoChange = (valor) => {
    setSeleccionTipo(valor);
    setSeleccionParte('');
    setPiezas([]);
  };

  // Agregar pieza adicional
  const agregarPieza = () => {
    if (piezas.length < 2) {
      setPiezas([
        ...piezas,
        { parte: '', color: '', producidas: 0, conforme: 0, defectos: [] },
      ]);
    }
  };

  const actualizarPieza = (index, campo, valor) => {
    const nuevas = [...piezas];
    nuevas[index][campo] = valor;
    setPiezas(nuevas);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 flex flex-col gap-4"
    >
      <div className="w-full">
        <Tiempo onChange={setDatosTiempo} />
      </div>

      <div className="w-full">
        <Seleccion nombre="Modelo" onChange={handleModeloChange} />
      </div>
      <div className="w-full">
        <InputNumber value={cantidad} onChange={setCantidad} />
      </div>

      <div className="w-full">
        <Seleccion
          nombre="Tipo"
          onChange={handleTipoChange}
          filtro={seleccionModelo}
        />
      </div>

      {/* --- Primera pieza (la original con condiciones) --- */}
      {seleccionTipo && (
        <>
          <div className="w-full">
            <Seleccion
              nombre="Parte"
              onChange={setSeleccionParte}
              filtro={seleccionTipo}
            />
          </div>
        </>
      )}
      {seleccionParte && (
        <>
          <div className="w-full">
            <Seleccion nombre="Color" onChange={setseleccionColor} />
          </div>
          <Number nombre="Cantidad" onChange={setinputProducidas} />
          <div className="w-full">
            <Number
              nombre="Conforme"
              onChange={setinputConforme}
              inputProducidas={inputProducidas}
            />
          </div>
        </>
      )}
      {inputConforme && (
        <>
          <SelectDefectos nombre="Defectos" inputProducidas={inputProducidas} />
        </>
      )}

      {/* --- Piezas adicionales --- */}
      {piezas.map((pieza, index) => (
        <div key={index} className="border p-3 rounded-lg space-y-2">
          <Seleccion
            nombre={`Parte extra ${index + 1}`}
            onChange={(v) => actualizarPieza(index, 'parte', v)}
            filtro={seleccionTipo}
          />
          <Seleccion
            nombre="Color"
            onChange={(v) => actualizarPieza(index, 'color', v)}
          />
          <Number
            nombre="Cantidad"
            onChange={(v) => actualizarPieza(index, 'producidas', v)}
          />
          <Number
            nombre="Conforme"
            onChange={(v) => actualizarPieza(index, 'conforme', v)}
            inputProducidas={pieza.producidas}
          />
          {pieza.conforme > 0 && (
            <SelectDefectos
              nombre="Defectos"
              inputProducidas={pieza.producidas}
              onChange={(v) => actualizarPieza(index, 'defectos', v)}
            />
          )}
        </div>
      ))}

      {/* --- Botón Agregar pieza SOLO cuando ya hay conforme y < 3 piezas en total --- */}
      {Boolean(seleccionParte) && piezas.length < 2 && (
        <Button
          type="button"
          onClick={agregarPieza}
          className="w-full bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar pieza
        </Button>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </Button>
    </form>
  );
}
