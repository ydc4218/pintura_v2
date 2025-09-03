import Seleccion from '../componentes/Seleccion';
import Number from '../componentes/Number';
import SelectDefectos from '../componentes/SelectDefectos';
import { Chip } from '@heroui/react';

export default function Pieza({
  index,
  pieza,
  actualizarPieza,
  seleccionTipo,
  partesIds,
}) {
  const excluir = partesIds.filter((_, i) => i !== index);

  const handleActualizar = (campo, valor) => {
    // Convertimos a número si es cantidad o conforme
    if (campo === 'producidas' || campo === 'conforme') {
      valor = +valor;
    }
    actualizarPieza(index, campo, valor);
  };

  return (
    <div className="w-full space-y-2 border border-gray-300 rounded p-1">
      {/* Contenedor solo para centrar el Chip */}
      <div className="flex justify-center">
        <Chip color="warning" variant="light">
          {index === 0 ? 'Pieza Inicial' : `Pieza Adicional ${index}`}
        </Chip>
      </div>

      {/* Selección de Parte */}

      <Seleccion
        nombre="Parte"
        onChange={(v) => handleActualizar('parte', v)}
        filtro={seleccionTipo}
        excluir={excluir}
        value={pieza.parte}
        Err={pieza.errores?.parte}
      />

      {pieza.parte && (
        <>
          {/* Selección de Color , segunda pieza no lleva color*/}
          {index === 0 && (
            <Seleccion
              nombre="Color"
              onChange={(v) => handleActualizar('color', v)}
              value={pieza.color}
              Err={pieza.errores?.color}
            />
          )}

          {/* Número de producidas */}
          <Number
            nombre="Cantidad"
            value={pieza.producidas}
            onChange={(v) => handleActualizar('producidas', v)}
            Err={pieza.errores?.producidas}
            inputProducidas={undefined} // opcional, según tu lógica
          />

          {/* Número de conformes */}
          <Number
            nombre="Conforme"
            value={pieza.conforme}
            onChange={(v) => handleActualizar('conforme', v)}
            Err={pieza.errores?.conforme}
            inputProducidas={pieza.producidas || 0}
          />

          {/* Selección de defectos, solo si hay conformes */}
          {pieza.conforme > 0 && (
            <SelectDefectos
              nombre="Defectos"
              inputProducidas={pieza.producidas || 0}
              value={pieza.defectos || []}
              onChange={(v) => handleActualizar('defectos', v)}
            />
          )}
        </>
      )}
    </div>
  );
}
