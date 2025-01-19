
import axios from 'axios'
const apiURl = "https://server-task.fly.dev/api"

const taskApi = axios.create({
    baseURL: apiURl
})

// Todo: configurar interceptores

taskApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})

export default taskApi;
