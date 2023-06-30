import dotenv from "dotenv";
dotenv.config()

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/f1DB';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

type dbConfigType = {
    url: string;
    grandprixColl: string;
    driversColl: string;
    participationColl: string;
    teamsColl: string;
}

type serverConfigType = {
    port: number;
}

type configType = {
    db: dbConfigType;
    server: serverConfigType
}


export const config : configType = {
    db: {
        url: DB_URL,
        grandprixColl: "grandprix", // collection name
        driversColl: "drivers",
        participationColl: "participation",
        teamsColl: "teams",
    },
    server: {
        port: SERVER_PORT
    }
};
