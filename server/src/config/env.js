import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkgJson = require('../../../package.json');

export const APP_VERSION = pkgJson.version;

export const ConexionData = {
  user: 'pintura_app', // o el usuario que estés usando
  host: '10.10.128.50', // o la IP de tu servidor
  database: 'produccion',
  password: 'Hmcl*pass*2024',
  port: 5432,
};

export const BDLogs = {
  user: 'postgres', // o el usuario que estés usando
  host: '10.10.128.50', // o la IP de tu servidor
  database: 'logs',
  password: 'Hmcl*pass*2024',
  port: 5432,
};
