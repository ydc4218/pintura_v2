// routes/index.js
import { Router } from 'express';
import { getData } from '../controller/get.Controller.js';
import { Defectos, Models, Tipo, TipoById, Color } from '../services/index.js';

const router = Router();

router.get('/modelo', getData(Models, 'Error obteniendo modelos'));
router.get('/tipo', getData(Tipo, 'Error obteniendo tipos'));
router.get('/parte', getData(TipoById, 'Error obteniendo partes por tipo')); // 👈 con query
router.get('/color', getData(Color, 'Error obteniendo colores'));
router.get('/defectos', getData(Defectos, 'Error obteniendo defectos'));

export default router;
