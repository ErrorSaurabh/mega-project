import express from "express";
import {
    createOrder, GetOrders, getOrderStats, GetOrder, updateOrder 
} from "../controllers/orderController.js";
import isLogin from "../middleware/IsLogin.js";
//import isAdmin from "../middleware/isAdmin.js"
const router = express.Router();

router.post("/create",isLogin, createOrder);

router.get("/read",isLogin,GetOrders);

router.get("/stats",isLogin,getOrderStats);

router.get("/read/:id",isLogin,GetOrder)

router.put("/update/:id",isLogin,updateOrder)

export default router;
