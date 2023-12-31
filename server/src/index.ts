import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "./config";
import path from "path"; 

// import routes
import grandprixRoutes from './routes/grandprix';
import driverRoutes from './routes/driver';
import teamRoutes from './routes/team'
import participationRoutes from './routes/participation'

// for auto documentation 
import swaggerUi from 'swagger-ui-express';
import docs from './docs';

const app: Express = express();

// connect database
mongoose.connect(config.db.url)
mongoose.connection.on("error", console.error.bind(console, "connection error:"))
mongoose.connection.once("open", () => {
    console.log("Database connected")
})

app.use(express.json()) // body parser
app.use(express.static(path.join(__dirname, '../../client/build'))) // public DIR

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	next()
})

// set up routes
app.get('/', function (req: Request, res: Response) {
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.get("/healthcheck", (req: Request, res: Response) => {
	res.send("F1 results app is working normally");
});

app.use('/api/v1/grandprix', grandprixRoutes)
app.use('/api/v1/drivers', driverRoutes)
app.use('/api/v1/teams', teamRoutes)
app.use('/api/v1/participation', participationRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

//handling all other request to any route that is not available 
app.all('*', (req: Request, res: Response) => {
	res.status(404).json({message: "Page not found"}) 
})

const port = config.server.port
app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});

