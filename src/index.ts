import express, { Express, Request, Response } from "express";
const port = 8000;

const app: Express = express();

app.get("/api/v1/healthcheck", (req: Request, res: Response) => {
  res.send("F1 results app is working normally");
});


app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

