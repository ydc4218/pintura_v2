import pkg from 'pg';
import { ConexionData } from './env.js';

export default async function ConectarBaseDatos(Consulta, Parametros) {
  const { Pool } = pkg;

  const pool = new Pool(ConexionData);

  try {
    const { rows } = await pool.query(Consulta, Parametros);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await pool.end(); // Importante: await para cerrar correctamente
  }
}
