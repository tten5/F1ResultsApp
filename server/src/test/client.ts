// general config for tests
import axios from "axios"
import { config } from "../config"

let baseUrl = process.env.TEST_BASE_URL || `http://localhost:${config.server.port}/api/v1`

const requestInstance = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
})

export default requestInstance