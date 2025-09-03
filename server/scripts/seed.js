import ConectarBaseDatos from '../src/config/DB.js';
import XLSX from 'xlsx';

const seed = async () => {
  // 🔹 Leer archivo Excel
  const workbook = XLSX.readFile('./Datos.xlsx'); // Abrir archivo Excel
  const sheetName = workbook.SheetNames[0]; // Tomar la primera hoja
  const sheet = workbook.Sheets[sheetName]; // Obtener contenido de la hoja
  const datos = XLSX.utils.sheet_to_json(sheet); // Convertir a array de objetos

  // 🔹 Usar el nombre de la hoja como nombre de la tabla
  const tabla = sheetName.toLowerCase();

  if (!tabla || datos.length === 0) {
    console.error('No hay datos para insertar');
    return; // Salir si no hay datos
  }

  // 🔹 Obtener nombres de columnas desde la primera fila
  const columnas = Object.keys(datos[0]);

  // 🔹 Detectar si existe alguna columna que contenga "nombre"
  // Esto servirá para aplicar restricción UNIQUE y ON CONFLICT
  const colNombre = columnas.find((c) => c.toLowerCase().includes('nombre'));

  // 🔹 Construir definición SQL de columnas dinámicamente
  const columnasSQL = columnas
    .map((col) => {
      if (col.toLowerCase().includes('nombre')) {
        return `${col} TEXT UNIQUE`; // Si es "nombre", aplicar UNIQUE
      }
      return `${col} TEXT`; // Caso general: solo TEXT
    })
    .join(', ');

  // 🔹 Definir nombre de columna ID y columna "activo"
  const idColumna = `id_${tabla}`;
  const activo = `activo_${tabla}`;

  // 🔹 Crear tabla con columnas dinámicas
  const sqlCreate = `
    CREATE TABLE IF NOT EXISTS ${tabla} (
      ${idColumna} SERIAL PRIMARY KEY,
      ${columnasSQL},
      ${activo} CHAR(1) NOT NULL DEFAULT 'S' CHECK (${activo} IN ('S','N'))
    )
  `;

  console.log(sqlCreate);
  await ConectarBaseDatos(sqlCreate); // Ejecutar creación de la tabla

  // 🔹 Insertar datos dinámicos fila por fila
  for (const row of datos) {
    const keys = Object.keys(row); // Columnas
    const valores = Object.values(row); // Valores

    // Agregar columna "activo" con valor por defecto "S"
    keys.push(activo);
    valores.push('S');

    // Crear placeholders ($1, $2, $3, ...)
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    // SQL de inserción
    let sqlInsert = `
      INSERT INTO ${tabla} (${keys.join(', ')})
      VALUES (${placeholders})
    `;

    // Si existe columna "nombre", usarla en ON CONFLICT
    if (colNombre) {
      sqlInsert += ` ON CONFLICT (${colNombre}) DO NOTHING`;
    } else {
      sqlInsert += ` ON CONFLICT DO NOTHING`;
    }

    // Ejecutar inserción
    await ConectarBaseDatos(sqlInsert, valores);
  }

  console.log(`Datos insertados en tabla "${tabla}" desde Excel 🚀`);

  // 🔹 Exportar nuevamente la tabla a Excel (respaldo)
  const registros = await ConectarBaseDatos(`SELECT * FROM ${tabla}`);
  const hoja = XLSX.utils.json_to_sheet(registros); // Convertir registros a hoja Excel
  const libro = XLSX.utils.book_new(); // Crear nuevo libro
  XLSX.utils.book_append_sheet(libro, hoja, tabla); // Agregar hoja

  const nombreArchivo = `./export_${tabla}.xlsx`;
  XLSX.writeFile(libro, nombreArchivo); // Guardar archivo Excel

  console.log(`Tabla "${tabla}" exportada a ${nombreArchivo} ✅`);

  // Cerrar proceso
  return;
};

// Ejecutar script con manejo de errores
seed().catch((err) => {
  console.error('Error en seed:', err);
  return;
});
