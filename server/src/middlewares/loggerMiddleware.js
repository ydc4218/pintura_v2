import { guardarLog } from '../services/index.js';

// Middleware para requests
export const requestLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    res.locals.responseBody = body; // Guardar respuesta
    return originalSend.call(this, body);
  };

  res.on('finish', () => {
    guardarLog({
      method: req.method,
      url: req.originalUrl,
      headers: {
        host: req.headers.host || null,
        referer: req.headers.referer || null,
      },
      body: req.body,
      statusCode: res.statusCode,
      response: res.statusCode < 400 ? 'OK' : res.locals.responseBody || null,
    });
  });

  next();
};

// Middleware para errores
export const errorHandler = (err, req, res, next) => {
  guardarLog({
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
    statusCode: 500,
    response: err.stack,
  });

  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};
