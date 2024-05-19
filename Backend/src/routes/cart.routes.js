import { Router } from "express";
import { createOrUpdateCart, getCartById } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/add-to-cart").post(verifyJWT, createOrUpdateCart);

router.route("/get-cart").get(verifyJWT, getCartById);


export default router;