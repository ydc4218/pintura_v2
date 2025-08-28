// db.js
import pkg from 'pg';
import { BDLogs, ConexionData } from './env.js';

export default async function ConectarBaseDatos(
  Consulta,
  Parametros = [],
  Tabla = null,
  Logs = null
) {
  const { Pool } = pkg;

  const pool = new Pool(Logs ? BDLogs : ConexionData);

  try {
    // Si mandas una tabla, la crea antes de ejecutar la consulta
    if (Tabla) {
      pool.query(Tabla);
    }

    const { rows } = await pool.query(Consulta, Parametros);
    return rows;
  } catch (error) {
    console.error('Error en consulta:', error);
    throw error;
  } finally {
    await pool.end(); // cerrar conexión después de la consulta
  }
}
