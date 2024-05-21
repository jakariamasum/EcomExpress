import express, { Application, Request, Response } from "express";
import { productRoutes } from "./modules/product/product.route";
import cors from 'cors'
const app: Application = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use('/api',productRoutes)
export default app;
