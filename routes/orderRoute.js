import { Router } from "express";
import { createOrder } from "../controller/orderController.js";

const router = Router();
router.use("/", createOrder);

export default router;
