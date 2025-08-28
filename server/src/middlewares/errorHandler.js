import ConectarBaseDatos from '../config/DB.js';
import { APP_VERSION } from '../config/env.js';
import { TablaLogs } from '../SQL/Modelos.js';

export const errorHandler = (err, req, res, next) => {
  try {
    ConectarBaseDatos(
      `INSERT INTO logs (aplicacion, method, url, headers, body, statusCode, response, version)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        'Pintura',
        req.method,
        req.originalUrl,
        req.headers,
        req.body,
        500,
        err.stack,
        APP_VERSION,
      ],
      TablaLogs,
      true
    );
  } catch (error) {
    console.error('❌ Error guardando log de error:', error);
  }

  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};
