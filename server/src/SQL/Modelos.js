export const Tabla_Modelo = `CREATE TABLE IF NOT EXISTS modelos (
    id SERIAL PRIMARY KEY,
    nombre_modelo TEXT NOT NULL,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;
export const TablaLogs = `
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        aplicacion TEXT,
        method TEXT,
        url TEXT,
        headers JSONB,
        body JSONB,
        statusCode INTEGER,
        response TEXT,
        version TEXT,
        error TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

export const Tabla_Tipo = `
CREATE TABLE IF NOT EXISTS tipo_pieza (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo TEXT NOT NULL UNIQUE,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;
