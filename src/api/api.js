import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    maxContentLength: Infinity, // Deshabilita el límite para el contenido
    maxBodyLength: Infinity,
});

export default api;