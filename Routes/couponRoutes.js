import express from "express";
import { create, deleteCoupon, GetAllCoupons, GetCoupon, updateCoupon } from "../controllers/couponController.js";
import isLogin from "../middleware/IsLogin.js";

const router = express.Router();

// CREATE: POST request to create a new coupon
router.post("/create", isLogin, create);

// READ: GET request to get all coupon
router.get("/read", isLogin, GetAllCoupons);

// READ: GET request to get a coupon by ID
router.get("/read/:id", GetCoupon);

// UPDATE: PUT request to update a coupon by ID
router.put("/update/:id", isLogin, updateCoupon);

// DELETE: DELETE request to delete a coupon by ID
router.delete("/delete/:id", isLogin, deleteCoupon);

export default router;
