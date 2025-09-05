// controller/general.controller.js
export const getData = (serviceFn, errorMsg) => async (req, res) => {
  try {
    const data = await serviceFn(req.query, req.params, req.body); // 👈 si algún servicio necesita params
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: errorMsg || 'Error en el servidor' });
  }
};
