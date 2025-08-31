export function validarFormulario({
  datosTiempo,
  seleccionModelo,
  seleccionTipo,
  lote,
  piezas,
}) {
  const errores = {
    ErrTiempo: '',
    ErrModelo: '',
    ErrTipo: '',
    ErrCantidad: '',
    piezas: {}, // errores específicos por pieza
  };

  // Validar campos generales solo si tienen valor
  if (datosTiempo === null || datosTiempo === undefined) errores.ErrTiempo = '';
  if (!seleccionModelo) errores.ErrModelo = '';
  if (!seleccionTipo) errores.ErrTipo = '';
  if (lote !== undefined && lote !== null && lote <= 0)
    errores.ErrCantidad = 'Debe ingresar un número de lote.';

  // Validar piezas
  if (piezas && piezas.length > 0) {
    for (let i = 0; i < piezas.length; i++) {
      const p = piezas[i];

      // Solo validar si ya se seleccionó una parte
      if (p.parte) {
        errores.piezas[i] = {};

        // Color
        if (p.color !== undefined && p.color !== null && p.color !== '') {
          // ok
        } else if (p.color !== undefined && p.color !== null) {
          errores.piezas[i].color = 'Debe seleccionar el color';
        }

        // Producidas
        if (
          p.producidas !== undefined &&
          p.producidas !== null &&
          p.producidas > 0
        ) {
          // ok
        } else if (p.producidas !== undefined && p.producidas !== null) {
          errores.piezas[i].producidas = 'Debe ingresar producidas';
        }

        // Conforme
        if (p.conforme !== undefined && p.conforme !== null && p.conforme > 0) {
          if (p.producidas && p.conforme > p.producidas) {
            errores.piezas[i].conforme =
              'Conformes deben ser iguales o menores a producidas';
          }
        } else if (p.conforme !== undefined && p.conforme !== null) {
          errores.piezas[i].conforme = 'Debe ingresar conformes';
        }

        // Limpiar si no hay errores
        if (Object.keys(errores.piezas[i]).length === 0)
          delete errores.piezas[i];
      }
    }
  }

  const ok = Object.values(errores).every((v) =>
    typeof v === 'string' ? v === '' : Object.keys(v).length === 0
  );

  return { ok, errores };
}
