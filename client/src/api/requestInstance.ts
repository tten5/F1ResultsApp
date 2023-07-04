import axios from "axios"
import { config } from "../config"

let baseUrl = process.env.REACT_APP_BASE_URL || `http://localhost:${config.server.port}/api/v1`

console.log(baseUrl)

const requestInstance = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
})

export default requestInstance