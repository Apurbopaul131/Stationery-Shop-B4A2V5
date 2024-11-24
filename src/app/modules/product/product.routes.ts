import express from "express";
import { ProductControllers } from "./product.controller";

//create router object
const router = express.Router();

//create post api to handle post requsest from client
router.post("/products", ProductControllers.createProduct);

//create get api to handle get request from client
router.get("/products", ProductControllers.getProducts);

//create get api to handle get request from client
router.get("/products/:productId", ProductControllers.getSingleProduct);

//create delete api to handle delete request from client
router.delete("/products/:productId", ProductControllers.deleteSingleProduct);

router.put("/products/:productId", ProductControllers.updateSingleProduct);

//export
export const productRouter = router;
