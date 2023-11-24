import axios from 'axios'

const clienteAxios = axios.create({
 // baseURL: "https://mell-backend.onrender.com"
  baseURL: "http://localhost:4000"
})

export default clienteAxios