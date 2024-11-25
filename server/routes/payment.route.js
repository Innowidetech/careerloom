import express from "express"
import {  createPaymentOrder, verifyPayment } from "../controllers/payment.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/create-order").post(isAuthenticated,createPaymentOrder);
router.route("/verify-payment").post(verifyPayment);

export default router;