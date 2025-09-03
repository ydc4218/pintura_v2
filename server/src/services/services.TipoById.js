// services/services.models.js
import ConectarBaseDatos from '../config/DB.js';
import { GetPartesByTipo } from '../SQL/Consultas.js';
import { Tabla_Tipo } from '../SQL/Modelos.js';

export const TipoById = async (Id_Parte) => {
  const { tipo, excluir } = Id_Parte; // destructuring directo
  // excluir debería ser un array de IDs numéricos

  try {
    let query = GetPartesByTipo;
    const params = ['S', tipo];

    if (excluir) {
      query += ` AND id_partes_pintura NOT IN (${excluir})`;
    }

    query += ' ORDER BY nombre_parte';

    const rows = await ConectarBaseDatos(query, params, Tabla_Tipo);

    return rows.map((r) => ({
      key: r.id_partes_pintura,
      label: r.nombre_parte,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};
