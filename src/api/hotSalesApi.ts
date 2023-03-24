import axios from 'axios';

const hotSalesApi = axios.create({
    baseURL: import.meta.env.HS_PATH_SERVER_API,
});

export default hotSalesApi;