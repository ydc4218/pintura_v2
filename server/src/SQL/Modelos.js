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
CREATE TABLE IF NOT EXISTS pin_tipo_lista (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo TEXT NOT NULL UNIQUE,
    activo CHAR(1) NOT NULL DEFAULT 'S' CHECK (activo IN ('S', 'N'))
);
`;
export const Tabla_Baches = `
CREATE TABLE IF NOT EXISTS pin_baches (
    id_baches SERIAL PRIMARY KEY,
    modelo_id INT NOT NULL,           -- FK hacia tabla modelo
    parte_id INT NOT NULL,            -- FK hacia tabla parte
    tipo_pieza_id INT,                -- FK hacia tabla tipo_pieza
    color_id INT,                     -- FK hacia tabla color
    fecha DATE NOT NULL,              -- Fecha de registro
    hora_inicio TIME NOT NULL,        -- Hora de inicio
    hora_final TIME NOT NULL,         -- Hora de finalización
    duracion INTERVAL,                -- Duración calculada o registrada
    lote VARCHAR(15),                 -- Número o referencia de lote
    producidas INT DEFAULT 0,         -- Cantidad producida
    conforme INT DEFAULT 0,           -- Cantidad conforme
    observaciones TEXT                -- Comentarios u observaciones
);
`;

export const Tabla_Defectos = `
CREATE TABLE IF NOT EXISTS pin_defectos (
    id_defecto SERIAL PRIMARY KEY,
    id_baches INT NOT NULL,            -- FK hacia tabla baches
    parte_id INT NOT NULL,            -- FK hacia tabla parte
    defecto_id INT NOT NULL,          -- FK hacia tabla catalogo de defectos
    cantidad INT DEFAULT 0,           -- Cantidad de piezas con defecto
    observaciones TEXT                -- Comentarios u observaciones
);
`;

export const Tabla_Reg_tiempos = `
CREATE TABLE IF NOT EXISTS pin_reg_tiempos (
    id_reg_tiempo SERIAL PRIMARY KEY,
    id_baches INT NOT NULL,            -- FK hacia tabla baches
    parte_id INT NOT NULL,            -- FK hacia tabla parte
    hora_inicio TIME NOT NULL,        -- Hora de inicio
    hora_final TIME NOT NULL,         -- Hora de finalización
    duracion INTERVAL,                -- Duración calculada o registrada
    producidas INT DEFAULT 0,         -- Cantidad de piezas producidas
    evento VARCHAR(50) NOT NULL       -- Inicio Producción | Paro | Cambio de color
);
`;

export const Tabla_Estados_Registro = `
CREATE TABLE IF NOT EXISTS pin_estados (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(100) NOT NULL,             -- Nombre del estado
    activo CHAR(1) NOT NULL DEFAULT 'S'              -- 'S' = Sí, 'N' = No
           CHECK (activo IN ('S', 'N'))
);
`;

export const Tabla_Hora_Registro = `
CREATE TABLE IF NOT EXISTS tabla_hora_defectos (
    id SERIAL PRIMARY KEY,
    hora TIME NOT NULL DEFAULT '07:00:00', -- Hora fija para defectos
    fecha DATE DEFAULT CURRENT_DATE        -- Fecha de referencia
);
`;
