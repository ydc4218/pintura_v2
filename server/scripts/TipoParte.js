import ConectarBaseDatos from '../src/config/DB.js';

// Definición de la tabla con UNIQUE
const Tabla_Modelo = `
CREATE TABLE IF NOT EXISTS tipo_pieza (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo TEXT NOT NULL UNIQUE,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;

// Los modelos a insertar
const modelos = [
  'Metal',
  'Plástico',
  'Tanque'
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
      INSERT INTO tipo_pieza (nombre_tipo, activo)
      VALUES ${valores}
      ON CONFLICT (nombre_tipo) DO NOTHING
    `;

    await ConectarBaseDatos(query, params);
    console.log('✅ Datos insertados correctamente');
  } catch (error) {
    console.error('❌ Error insertando:', error);
  }
}

insertarModelos();