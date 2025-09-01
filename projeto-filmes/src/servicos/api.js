import axios from 'axios';

const chaveAPI = 'da91b3403d582290ebd7f438b607a7e0';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: chaveAPI,
    language: 'pt-BR',
  },
});

export default api;