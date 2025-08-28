import ConectarBaseDatos from '../src/config/DB.js';

// Definición de la tabla con UNIQUE
const Tabla_Modelo = `
CREATE TABLE IF NOT EXISTS modelos (
    id_modelo SERIAL PRIMARY KEY,
    nombre_modelo TEXT NOT NULL UNIQUE,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;

// Los modelos a insertar
const modelos = [
  'DASH FI EV',
  'ECO 100/c',
  'ECO DELUXE CW/c',
  'ECO DELUXE SP/c',
  'HUNK 160 4V',
  'HUNK 160FI ST',
  'SPLENDOR XPRO',
  'THRILLER PRO',
  'THRILLER XTREME',
  'XPULSE 200 4V',
  'XPULSE 200 FIOC',
  'XPULSE TFIOC',
  'IGNITOR XTECH',
  'HUNK 150 XTECH',
  'XPULSE 200 RALLY',
  'HUNK 125 R',
  'XOOM 110',
  'XOOM 125',
  'XOOM 160',
];

async function insertarModelos() {
  try {
    // 🔹 Primero creamos la tabla si no existe
    await ConectarBaseDatos(Tabla_Modelo);

    // 🔹 Generamos placeholders dinámicos ($1, $2, ...)
    const valores = modelos
      .map((m, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(', ');
    const params = modelos.flatMap((m) => [m, 'S']);

    const query = `
      INSERT INTO modelos (nombre_modelo, activo)
      VALUES ${valores}
      ON CONFLICT (nombre_modelo) DO NOTHING
    `;

    await ConectarBaseDatos(query, params);
    console.log('✅ Modelos insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando modelos:', error);
  }
}

insertarModelos();
