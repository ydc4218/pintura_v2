import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkgJson = require('../../../package.json');

export const APP_VERSION = pkgJson.version;

export const ConexionData = {
  user: 'usrapps', // o el usuario que estés usando
  host: '10.10.128.14', // o la IP de tu servidor
  database: 'produccion',
  password: 'h3r0c4lidb2025',
  port: 5432,
};

export const BDLogs = {
  user: 'usrapps', // o el usuario que estés usando
  host: '10.10.128.14', // o la IP de tu servidor
  database: 'logs',
  password: 'h3r0c4lidb2025',
  port: 5432,
};
