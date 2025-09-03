// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { GetModelo } from '../SQL/Consultas.js';
import { Tabla_Modelo } from '../SQL/Modelos.js';

export const Models = async () => {
  try {
    const rows = await ConectarBaseDatos(
      GetModelo,
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
