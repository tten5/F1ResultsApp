import { config } from "../config";

export default {
    servers: [
      {
        url: `http://localhost:${config.server.port}/`, 
        description: "Local server", 
      },
      {
        url: process.env.HOST_IP || `http://localhost:${config.server.port}/`, 
        description: "Online server", 
      },
    ],
  };