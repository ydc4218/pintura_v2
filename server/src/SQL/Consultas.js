export const GetPinturaColors = `SELECT id_color_pintura, nombre_color FROM pintura_color_lista 
      WHERE activo_color_pintura = $1 ORDER BY nombre_color`;

export const GetDefectosPintura = `SELECT id_defectos_pintura, nombre_defecto FROM pintura_defectos_lista 
      WHERE activo_defectos_pintura = $1 ORDER BY nombre_defecto`;

export const GetModelo = `SELECT id_modelo, nombre_modelo FROM modelos_lista WHERE activo_pintura = $1 ORDER BY nombre_modelo`;

export const GetTipo =
  'SELECT id_tipo, nombre_tipo FROM pintura_tipo_pieza_lista WHERE activo = $1 ORDER BY nombre_tipo';

export const GetPartesByTipo = `
      SELECT id_partes_pintura, nombre_parte 
      FROM pintura_partes_lista
      WHERE activo_partes_pintura = $1 AND tipo_parte = $2
    `;

export const IntoLogs = `INSERT INTO logs (aplicacion, method, url, headers, body, statusCode, response, version)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
