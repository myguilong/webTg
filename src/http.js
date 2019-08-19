import axios from 'axios'

const http = axios.create({
    baseURL:'http://localhost/apis',
    withCredentials: true 
})
export default http