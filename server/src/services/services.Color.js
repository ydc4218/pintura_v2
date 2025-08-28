import ConectarBaseDatos from '../config/DB.js';
import { Tabla_Modelo } from '../SQL/Modelos.js';

export const Color = async () => {
  try {
    const rows = await ConectarBaseDatos(
      `SELECT id_color_pintura, nombre_color FROM color_pintura 
      WHERE activo_color_pintura = $1 ORDER BY nombre_color`,
      ['S'],
      Tabla_Modelo
    );

    // Transformar a formato { key, label }
    return rows.map((r) => ({
      key: r.id_color_pintura,
      label: r.nombre_color,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error; // <- propagar el error al controlador
  }
};
