// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { Tabla_Tipo } from '../SQL/Modelos.js';

export const TipoById = async (Id_Parte) => {
  const { tipo } = Id_Parte; // destructuring directo
  try {
    const rows = await ConectarBaseDatos(
      `SELECT id_partes_pintura, nombre_parte FROM partes_pintura 
      WHERE activo_partes_pintura = $1 AND tipo_parte = $2 
      ORDER BY nombre_parte`,
      ['S', tipo],
      Tabla_Tipo
    );

    // Transformar a formato { key, label }
    return rows.map((r) => ({
      key: r.id_partes_pintura,
      label: r.nombre_parte,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error; // <- propagar el error al controlador
  }
};
