import ConectarBaseDatos from '../src/config/DB.js';
import XLSX from 'xlsx';

const seed = async () => {
  // 🔹 Leer archivo Excel
  const workbook = XLSX.readFile('./Datos.xlsx');
  const sheetName = workbook.SheetNames[0]; // primera hoja
  const sheet = workbook.Sheets[sheetName];
  const datos = XLSX.utils.sheet_to_json(sheet); // array de objetos

  const tabla = sheetName.toLowerCase(); // nombre de la hoja = nombre de la tabla

  if (!tabla || datos.length === 0) {
    console.error('No hay datos para insertar');
    process.exit(1);
  }

  // Tomamos las columnas de la primera fila del Excel
  const columnas = Object.keys(datos[0]);

  // Buscar la primera columna que contenga "nombre"
  const colNombre = columnas.find((c) => c.toLowerCase().includes('nombre'));

  // 🔹 Crear tabla dinámica con columna "activo"
  const columnasSQL = columnas
    .map((col) => {
      if (col.toLowerCase().includes('nombre')) {
        return `${col} TEXT UNIQUE`; // 👈 UNIQUE si tiene "nombre"
      }
      return `${col} TEXT`;
    })
    .join(', ');

  const idColumna = `id_${tabla}`;
  const activo = `activo_${tabla}`;
  const sqlCreate = `
    CREATE TABLE IF NOT EXISTS ${tabla} (
      ${idColumna} SERIAL PRIMARY KEY,
      ${columnasSQL},
      ${activo} CHAR(1) NOT NULL DEFAULT 'S' CHECK (${activo} IN ('S','N'))
    )
  `;

  console.log(sqlCreate);
  await ConectarBaseDatos(sqlCreate);

  // 🔹 Insertar datos dinámicos
  for (const row of datos) {
    const keys = Object.keys(row);
    const valores = Object.values(row);

    keys.push(activo);
    valores.push('S');

    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    let sqlInsert = `
      INSERT INTO ${tabla} (${keys.join(', ')})
      VALUES (${placeholders})
    `;

    // Si hay columna con "nombre", usarla en el ON CONFLICT
    if (colNombre) {
      sqlInsert += ` ON CONFLICT (${colNombre}) DO NOTHING`;
    } else {
      sqlInsert += ` ON CONFLICT DO NOTHING`;
    }

    await ConectarBaseDatos(sqlInsert, valores);
  }

  console.log(`Datos insertados en tabla "${tabla}" desde Excel 🚀`);

  // 🔹 Exportar nuevamente la tabla a Excel (como respaldo)
  const registros = await ConectarBaseDatos(`SELECT * FROM ${tabla}`);
  const hoja = XLSX.utils.json_to_sheet(registros);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, tabla);

  const nombreArchivo = `./export_${tabla}.xlsx`;
  XLSX.writeFile(libro, nombreArchivo);

  console.log(`Tabla "${tabla}" exportada a ${nombreArchivo} ✅`);

  process.exit();
};

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
