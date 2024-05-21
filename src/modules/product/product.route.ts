import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post("/products", productControllers.createProduct);
router.get("/products/:productId?", productControllers.getProducts);
router.put('/products/:productId', productControllers.updateProduct);

export const productRoutes = router;
