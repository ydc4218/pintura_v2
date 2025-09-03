export const Tabla_Modelo = `CREATE TABLE IF NOT EXISTS modelos_lista (
    id SERIAL PRIMARY KEY,
    nombre_modelo TEXT NOT NULL,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;
export const TablaLogs = `
      CREATE TABLE IF NOT EXISTS logs (
        id_logs SERIAL PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS pintura_tipo_pieza_lista (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo TEXT NOT NULL UNIQUE,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;
export const Tabla_Baches = `
CREATE TABLE IF NOT EXISTS pintura_baches (
    id_bache SERIAL PRIMARY KEY,
    modelo_id INT NOT NULL,           -- FK hacia tabla modelo
    parte_id INT NOT NULL,            -- FK hacia tabla parte
    tipo_pieza_id INT,                -- FK hacia tabla tipo_pieza
    color_id INT,                     -- FK hacia tabla color
    modelo_lote VARCHAR(100),         -- Código o referencia de modelo/lote
    fecha DATE NOT NULL,              -- Fecha de registro
    hora_inicio TIME NOT NULL,        -- Hora de inicio
    hora_final TIME NOT NULL,         -- Hora de finalización
    duracion INTERVAL,                -- Duración calculada o registrada
    lote VARCHAR(50),                 -- Número o referencia de lote
    producidas INT DEFAULT 0,         -- Cantidad producida
    conforme INT DEFAULT 0,           -- Cantidad conforme
    observaciones TEXT                -- Comentarios u observaciones
);
`;

export const Tabla_Defectos = `
CREATE TABLE IF NOT EXISTS pintura_defectos (
    id_defecto SERIAL PRIMARY KEY,
    id_bache INT NOT NULL,            -- FK hacia tabla baches
    parte_id INT NOT NULL,            -- FK hacia tabla parte
    defecto_id INT NOT NULL,          -- FK hacia tabla catalogo de defectos
    cantidad INT DEFAULT 0,           -- Cantidad de piezas con defecto
    observaciones TEXT                -- Comentarios u observaciones
);
`;

export const Tabla_Reg_tiempos = `
CREATE TABLE IF NOT EXISTS pintura_reg_tiempos (
    id_reg_tiempo SERIAL PRIMARY KEY,
    id_bache INT NOT NULL,            -- FK hacia tabla baches
    parte_id INT NOT NULL,            -- FK hacia tabla parte
    hora_inicio TIME NOT NULL,        -- Hora de inicio
    hora_final TIME NOT NULL,         -- Hora de finalización
    duracion INTERVAL,                -- Duración calculada o registrada
    producidas INT DEFAULT 0          -- Cantidad de piezas producidas
);
`;

export const Tabla_Estados_Registro = `
CREATE TABLE IF NOT EXISTS pintura_estados_registro (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(100) NOT NULL,             -- Nombre del estado
    activo CHAR(1) NOT NULL DEFAULT 'S'              -- 'S' = Sí, 'N' = No
           CHECK (activo IN ('S', 'N'))
);
`;