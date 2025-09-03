// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { GetTipo } from '../SQL/Consultas.js';
import { Tabla_Tipo } from '../SQL/Modelos.js';

export const Tipo = async () => {
  try {
    const rows = await ConectarBaseDatos(
      GetTipo,
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
