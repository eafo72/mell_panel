import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: "http://3.14.32.216:4000"
  //baseURL: "http://localhost:4000"
})

export default clienteAxios