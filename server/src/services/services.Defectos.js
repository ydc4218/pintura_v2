// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { GetDefectosPintura } from '../SQL/Consultas.js';
import { Tabla_Modelo } from '../SQL/Modelos.js';

export const Defectos = async () => {
  try {
    const rows = await ConectarBaseDatos(
      GetDefectosPintura,
      ['S'],
      Tabla_Modelo
    );

    // Transformar a formato { key, label }
    return rows.map((r) => ({
      key: r.id_defectos_pintura,
      label: r.nombre_defecto,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error; // <- propagar el error al controlador
  }
};
