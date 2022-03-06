import axios from 'axios';

const URL = 'http://localhost:4000/';

const clienteAxios = axios.create({
    baseURL:URL
});

export default clienteAxios;