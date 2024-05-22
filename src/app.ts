import express, { Application, Request, Response } from "express";
import { productRoutes } from "./modules/product/product.route";
import cors from "cors";
import { OrderRoutes } from "./modules/order/order.route";
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/products", productRoutes);
app.use("/api/orders", OrderRoutes);

app.all("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});
export default app;
