import axios from 'axios';

const api = axios.create();

api.interceptors.response.use((res) => res.data);

export default api;
