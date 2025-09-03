import axios from 'axios';

const chaveAPI = import.meta.env.VITE_TMDB_API_KEY; 

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: chaveAPI,
    language: 'pt-BR',
  },
});

export default api;
