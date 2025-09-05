import { useState } from 'react';
import Tiempo from '../componentes/Tiempo';
import Seleccion from '../componentes/Seleccion';
import { Button, Form } from '@heroui/react';
import InputNumber from '../componentes/InputNumber';
import Pieza from './Pieza';
import { validarFormulario } from '../utils/Validar';
import { RegistroSendData } from '../utils/RegistroSendData';
import InputText from '../componentes/InputText';

export default function Registro({ setRegistroDirty }) {
  const [datosTiempo, setDatosTiempo] = useState(null);
  const [lote, setLote] = useState(0);
  const [seleccionModelo, setSeleccionModelo] = useState('');
  const [seleccionTipo, setSeleccionTipo] = useState('');
  const [loading, setLoading] = useState(false);
  const [observaciones, setObservaciones] = useState('');

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
  const handleSubmit = async (e) => {
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
        ErrLote: errores.ErrLote,
        ErrPiezas: '', // opcional si quieres mensaje global
      });
      return;
    }

    // Aquí iría la lógica de envío del formulario

    try {
      const horafinal = new Date(); // ⏰ capturar justo antes del envío
      setLoading(true); // ⏳ empieza cargando
      const data = await RegistroSendData({
        datosTiempo,
        horafinal,
        observaciones,
        lote,
        seleccionModelo,
        seleccionTipo,
        piezas,
      });
      console.log('✅ Respuesta del backend:', data);
    } catch (err) {
      console.error('❌ Error enviando:', err);
    } finally {
      setLoading(false); // ✅ termina siempre
    }
  };

  // ================================
  // Funciones para limpiar errores
  // ================================
  const clearError = (field) => {
    console.log(field);
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

  const handleLoteChange = (valor) => {
    setLote(valor);
    if (valor) clearError('ErrLote');
  };

  const handleObservacionChange = (valor) => {
    setObservaciones(valor);
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
          Lote: '',
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
        value={seleccionModelo}
        onChange={handleModeloChange}
        className="w-full"
        Err={InputError.ErrModelo}
      />

      {/* Lote */}
      <InputNumber
        value={lote}
        onChange={handleLoteChange}
        className="w-full"
        Disabled={datosTiempo}
        Err={InputError.ErrLote}
      />

      {/* Tipo */}
      <Seleccion
        nombre="Tipo"
        value={seleccionTipo}
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

      <InputText onChange={handleObservacionChange} />

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
        isDisabled={loading || partesIds.length === 0}
        isLoading={loading} // HeroUI spinner automático
        className="w-full px-4 py-2 rounded"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>
    </Form>
  );
}
