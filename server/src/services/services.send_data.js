// sendDatos.js
import pkg from 'pg';
import { ConexionData } from '../config/env.js';
import {
  Tabla_Baches,
  Tabla_Defectos,
  Tabla_Hora_Registro,
  Tabla_Reg_tiempos,
} from '../SQL/Modelos.js';

const { Pool } = pkg;
const pool = new Pool(ConexionData);

// Convierte hora 12h a 24h
function parseHora24(hora) {
  if (!hora) return '07:00:00';
  const [time, ampm] = hora.split(' ');
  if (!ampm) return time; // ya está en 24h
  let [h, m, s] = time.split(':').map(Number);
  if (ampm.toLowerCase() === 'p. m.' && h !== 12) h += 12;
  if (ampm.toLowerCase() === 'a. m.' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
}

// Calcula duración
function calcularDuracion(fechaIni, fechaFin) {
  if (!(fechaIni instanceof Date) || isNaN(fechaIni)) return '00:00:00';
  if (!(fechaFin instanceof Date) || isNaN(fechaFin)) return '00:00:00';
  if (fechaFin < fechaIni) return '00:00:00';

  let diff = fechaFin - fechaIni;
  const h = Math.floor(diff / 3600000);
  diff %= 3600000;
  const m = Math.floor(diff / 60000);
  diff %= 60000;
  const s = Math.floor(diff / 1000);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
}

// Construye fecha segura
function buildDate(fecha, hora) {
  if (!fecha || !hora) return null;
  const date = new Date(`${fecha}T${hora}`);
  return isNaN(date.getTime()) ? null : date;
}

export const SendDatos = async (query, params, body) => {
  const {
    datosTiempo,
    horafinal,
    lote,
    seleccionModelo,
    seleccionTipo,
    piezas,
  } = body || {};

  const modeloId = Number(seleccionModelo);
  const tipoId = Number(seleccionTipo);

  let primerColor = null;

  const listaPiezas = Object.values(piezas || {}).map((pieza, index) => {
    if (index === 0 && pieza.color) primerColor = Number(pieza.color);
    return {
      ...pieza,
      parte: Number(pieza.parte),
      color: pieza.color ? Number(pieza.color) : primerColor,
      defectos: (pieza.defectos || []).map((def) => ({
        ...def,
        id: Number(def.id),
        cantidad: Number(def.cantidad) || 0,
      })),
    };
  });

  const client = await pool.connect();
  try {
    await client.query(Tabla_Baches);
    await client.query(Tabla_Defectos);
    await client.query(Tabla_Reg_tiempos);
    await client.query(Tabla_Hora_Registro);

    await client.query('BEGIN');

    let primerRegistroTiempoInsertado = false;

    for (const pieza of listaPiezas) {
      const {
        parte,
        color,
        producidas = 0,
        conforme = 0,
        defectos = [],
      } = pieza;

      const inicio = new Date(datosTiempo);
      const fin = new Date(horafinal);
      const opciones = { timeZone: 'America/Bogota', hour12: false };

      const fechaISO = inicio.toISOString().split('T')[0]; // formato seguro
      const horaInicio = inicio.toLocaleTimeString('es-CO', opciones);
      const horaFinal = fin.toLocaleTimeString('es-CO', opciones);

      const duracionBache = calcularDuracion(inicio, fin);

      // --- Insertar bache ---
      const bacheResult = await client.query(
        `INSERT INTO pin_baches
        (modelo_id, parte_id, tipo_pieza_id, color_id, fecha, hora_inicio, hora_final, duracion, lote, producidas, conforme)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING id_baches, color_id`,
        [
          modeloId,
          parte,
          tipoId,
          color,
          fechaISO,
          horaInicio,
          horaFinal,
          duracionBache,
          lote,
          producidas,
          conforme,
        ]
      );

      const id_baches = bacheResult.rows[0]?.id_baches;
      if (!id_baches) throw new Error('Error al insertar bache');

      // --- Defectos ---
      const {
        rows: [horaRow],
      } = await client.query(
        `SELECT hora FROM tabla_hora_defectos ORDER BY id DESC LIMIT 1`
      );
      const horaDefecto = parseHora24(horaRow?.hora || '07:00:00');

      for (const defecto of defectos) {
        await client.query(
          `INSERT INTO pin_defectos
          (id_baches, parte_id, defecto_id, cantidad, observaciones)
          VALUES ($1,$2,$3,$4,$5)`,
          [
            id_baches,
            parte,
            defecto.id,
            defecto.cantidad,
            `Registrado a las ${horaDefecto}`,
          ]
        );
      }

      // --- Insertar en reg_tiempos (solo 1 vez) ---
      if (!primerRegistroTiempoInsertado) {
        let duracionEvento;
        let evento = 'Inicio Producción';

        const lastTiempo = await client.query(
          `SELECT hora_final FROM pin_reg_tiempos ORDER BY id_reg_tiempo DESC LIMIT 1`
        );

        const lastBache = await client.query(
          `SELECT color_id, hora_final FROM pin_baches 
           WHERE id_baches <> $1 
           ORDER BY id_baches DESC LIMIT 1`,
          [id_baches]
        );

        let horaAnterior = null;

        if (lastBache.rows.length > 0) {
          const ultimoColor = lastBache.rows[0].color_id;
          horaAnterior = new Date(
            `${fechaISO}T${parseHora24(lastBache.rows[0].hora_final)}`
          );
          evento = ultimoColor !== color ? 'Cambio de color' : 'Paro';
        } else if (lastTiempo.rows.length > 0) {
          horaAnterior = new Date(
            `${fechaISO}T${parseHora24(lastTiempo.rows[0].hora_final)}`
          );
          evento = 'Producción Continua';
        } else {
          // Primer registro de producción
          horaAnterior = new Date(`${fechaISO}T${horaDefecto}`);
          evento = 'Inicio Producción';
        }

        const inicioReg = new Date(`${fechaISO}T${horaInicio}`);
        const finReg = new Date(
          `${fechaISO}T${parseHora24(
            lastBache.rows[0]?.hora_final || horaDefecto
          )}`
        );
        duracionEvento = calcularDuracion(finReg, inicioReg);
       

        await client.query(
          `INSERT INTO pin_reg_tiempos
          (id_baches, parte_id, hora_inicio, hora_final, duracion, producidas, evento)
          VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [
            id_baches,
            parte,
            horaAnterior.toLocaleTimeString('es-CO', opciones),
            horaInicio,
            duracionEvento,
            producidas,
            evento,
          ]
        );

        primerRegistroTiempoInsertado = true;
      }
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al insertar datos:', error.message);
    throw error;
  } finally {
    client.release();
  }
};
