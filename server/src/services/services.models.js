// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { Tabla_Modelo } from '../SQL/Modelos.js';

export const Models = async () => {
  try {
    const rows = await ConectarBaseDatos(
      'SELECT id_modelo, nombre_modelo FROM modelos WHERE activo = $1 ORDER BY nombre_modelo',
      ['S'],
      Tabla_Modelo
    );

    // Transformar a formato { key, label }
    return rows.map((r) => ({
      key: r.id_modelo,
      label: r.nombre_modelo,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error; // <- propagar el error al controlador
  }
};
