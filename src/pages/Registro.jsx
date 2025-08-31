import { useState } from 'react';
import Tiempo from '../componentes/Tiempo';
import Seleccion from '../componentes/Seleccion';
import { Button, Form } from '@heroui/react';
import InputNumber from '../componentes/InputNumber';
import Pieza from './Pieza';
import { validarFormulario } from '../utils/Validar';

export default function Registro({ setRegistroDirty }) {
  const [datosTiempo, setDatosTiempo] = useState(null);
  const [lote, setLote] = useState(0);
  const [seleccionModelo, setSeleccionModelo] = useState('');
  const [seleccionTipo, setSeleccionTipo] = useState('');

  const [piezas, setPiezas] = useState([
    {
      parte: '',
      color: '',
      producidas: 0,
      conforme: 0,
      defectos: [],
      errores: {},
    },
  ]);
  const [partesIds, setPartesIds] = useState([]);

  const [InputError, setInputError] = useState({
    ErrTiempo: '',
    ErrModelo: '',
    ErrTipo: '',
    ErrPiezas: '',
    ErrLote: '',
  });

  // ================================
  // Función de submit
  // ================================
  const handleSubmit = (e) => {
    e.preventDefault();

    const { ok, errores } = validarFormulario({
      datosTiempo,
      seleccionModelo,
      seleccionTipo,
      lote,
      piezas,
    });

    if (!ok) {
      // actualizar errores de piezas y campos generales
      const piezasConErrores = piezas.map((p, i) => ({
        ...p,
        errores: errores.piezas?.[i] || {},
      }));
      setPiezas(piezasConErrores);

      setInputError({
        ErrTiempo: errores.ErrTiempo,
        ErrModelo: errores.ErrModelo,
        ErrTipo: errores.ErrTipo,
        ErrLote: errores.ErrCantidad,
        ErrPiezas: '', // opcional si quieres mensaje global
      });
      return;
    }

    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado correctamente', {
      datosTiempo,
      lote,
      seleccionModelo,
      seleccionTipo,
      piezas,
    });
  };

  // ================================
  // Funciones para limpiar errores
  // ================================
  const clearError = (field) => {
    setInputError((prev) => ({ ...prev, [field]: '' }));
  };

  const handleModeloChange = (valor) => {
    setDatosTiempo(new Date());
    setSeleccionModelo(valor);
    setRegistroDirty(true);
    if (valor) clearError('ErrModelo');
    setSeleccionTipo('');
    setPiezas([
      {
        parte: '',
        color: '',
        producidas: 0,
        conforme: 0,
        defectos: [],
        errores: {},
      },
    ]);
    setPartesIds([]);
  };

  const handleTipoChange = (valor) => {
    setSeleccionTipo(valor);
    if (valor) clearError('ErrTipo');
    setPiezas([
      {
        parte: '',
        color: '',
        producidas: 0,
        conforme: 0,
        defectos: [],
        errores: {},
      },
    ]);
    setPartesIds([]);
  };

  // ================================
  // Función para actualizar piezas
  // ================================
  const actualizarPieza = (index, campo, valor) => {
    const nuevas = [...piezas];
    nuevas[index][campo] = valor;

    // Recalcular IDs de partes seleccionadas
    const ids = nuevas.map((p) => p.parte).filter((p) => p !== '');
    setPartesIds(ids);

    // Limpiar errores de la pieza actual
    if (nuevas[index].errores?.[campo]) {
      nuevas[index].errores[campo] = undefined;
    }

    setPiezas(nuevas);
  };

  // ================================
  // Función para agregar piezas
  // ================================
  const agregarPieza = () => {
    if (piezas.length < 3) {
      setPiezas([
        ...piezas,
        {
          parte: '',
          color: '',
          producidas: 0,
          conforme: 0,
          defectos: [],
          errores: {},
        },
      ]);
    }
  };

  // ================================
  // Render
  // ================================
  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-2"
    >
      {/* Tiempo */}
      <Tiempo
        value={datosTiempo}
        Err={InputError.ErrTiempo}
        className="w-full"
      />

      {/* Modelo */}
      <Seleccion
        nombre="Modelo"
        onChange={handleModeloChange}
        className="w-full"
        Err={InputError.ErrModelo}
      />

      {/* Lote */}
      <InputNumber
        value={lote}
        onChange={setLote}
        className="w-full"
        Disabled={datosTiempo}
        Err={InputError.ErrLote}
      />

      {/* Tipo */}
      <Seleccion
        nombre="Tipo"
        onChange={handleTipoChange}
        filtro={seleccionModelo}
        className="w-full"
        Disabled={datosTiempo}
        Err={InputError.ErrTipo}
      />

      {/* Piezas */}
      {seleccionTipo &&
        piezas.map((pieza, index) => (
          <Pieza
            key={index}
            index={index}
            pieza={pieza}
            actualizarPieza={actualizarPieza}
            seleccionTipo={seleccionTipo}
            partesIds={partesIds}
            className="w-full"
          />
        ))}

      {/* Botón agregar pieza */}
      <Button
        type="button"
        onPress={agregarPieza}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        isDisabled={!(piezas.length < 3 && piezas.every((p) => p.parte))}
      >
        Agregar pieza
      </Button>

      {/* Botón enviar */}
      <Button
        type="submit"
        color="success"
        isDisabled={partesIds.length === 0}
        className="w-full px-4 py-2 rounded"
      >
        Enviar
      </Button>
    </Form>
  );
}
