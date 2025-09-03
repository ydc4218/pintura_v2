import ConectarBaseDatos from '../config/DB.js';
import { APP_VERSION } from '../config/env.js';
import { IntoLogs } from '../SQL/Consultas.js';
import { TablaLogs } from '../SQL/Modelos.js';

export async function guardarLog({
  aplicacion = 'Pintura',
  method,
  url,
  headers,
  body,
  statusCode,
  response,
}) {
  try {
    await ConectarBaseDatos(
      IntoLogs,
      [
        aplicacion,
        method,
        url,
        headers,
        body,
        statusCode,
        response,
        APP_VERSION,
      ],
      TablaLogs,
      true
    );
  } catch (error) {
    console.error('❌ Error guardando log:', error);
  }
}
