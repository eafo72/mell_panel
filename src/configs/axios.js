import axios from 'axios'

const clienteAxios = axios.create({
  //baseURL: 'http://ec2-18-219-23-15.us-east-2.compute.amazonaws.com'
  baseURL: 'http://localhost:7000'
  //baseURL: 'https://centralifemexico.com'
})

export default clienteAxios