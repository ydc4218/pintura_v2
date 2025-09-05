// ================================
// Función para enviar datos al backend

import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_SEND;

// ================================
export const RegistroSendData = async (payload) => {
  const res = await axios.post(apiUrl, payload);
  return res.data;
};
