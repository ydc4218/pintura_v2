import app from './src/app.js';

const port = process.env.PORT || 60;


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
