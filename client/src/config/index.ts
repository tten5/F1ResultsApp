

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

type dbConfigType = {
    yearStart: number;
    yearEnd: number;
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
        yearStart: 2014,
        yearEnd: 2023
    },
    server: {
        port: SERVER_PORT,
    }
};
