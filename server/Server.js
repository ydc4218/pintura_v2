import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Permite peticiones desde otros orígenes (tu frontend Vite)

const port = 3000;

// Datos simulados
const animales = [
  { key: 'perro', label: 'Perro' },
  { key: 'gato', label: 'Gato' },
  { key: 'loro', label: 'Loro' },
  { key: 'lobo', label: 'Lobo' },
];

const frutas = [
  { key: 'manzana', label: 'Manzana' },
  { key: 'pera', label: 'Pera' },
  { key: 'naranja', label: 'Naranja' },
];

// Rutas API
app.get('/api/animales', (req, res) => {
  res.json(animales);
});

app.get('/api/frutas', (req, res) => {
  res.json(frutas);
});

// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
