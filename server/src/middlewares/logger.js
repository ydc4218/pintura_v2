import ConectarBaseDatos from '../config/DB.js';
import { APP_VERSION } from '../config/env.js';
import { TablaLogs } from '../SQL/Modelos.js';

export const requestLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    res.locals.responseBody = body; // guardar respuesta
    return originalSend.call(this, body);
  };

  res.on('finish', () => {
    try {
      ConectarBaseDatos(
        `INSERT INTO logs (aplicacion, method, url, headers, body, statusCode, response, version)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          'Pintura',
          req.method,
          req.originalUrl,
          {
            host: req.headers.host || null,
            referer: req.headers.referer || null,
          },
          req.body,
          res.statusCode,
          res.statusCode < 400 ? 'OK' : res.locals.responseBody || null,
          APP_VERSION,
        ],
        TablaLogs,
        true
      );
    } catch (error) {
      console.error('❌ Error guardando log de request:', error);
    }
  });

  next();
};
