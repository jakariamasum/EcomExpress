import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post("/products", productControllers.createProduct);
router.get("/products", productControllers.getProducts);
router.put('/products/:productId', productControllers.updateProduct);
router.delete('/products/:productId', productControllers.deleteProduct);

export const productRoutes = router;
