// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { Tabla_Tipo } from '../SQL/Modelos.js';

export const Tipo = async () => {
  try {
    const rows = await ConectarBaseDatos(
      'SELECT id_tipo, nombre_tipo FROM tipo_pieza WHERE activo = $1 ORDER BY nombre_tipo',
      ['S'],
      Tabla_Tipo
    );

    // Transformar a formato { key, label }
    return rows.map((r) => ({
      key: r.id_tipo,
      label: r.nombre_tipo,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error; // <- propagar el error al controlador
  }
};
