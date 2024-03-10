import { Router } from "express";
import { login, register, logout } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import rateLimiter from "express-rate-limit";

const router = Router();
const apiLimiter = rateLimiter({
    windowMs: 1000 * 60 * 15,
    max: 15,
    message: { msg: "IP rate limit exceeded, retry in 15 minutes" }
});

router.post("/login", apiLimiter, validateLoginInput, login);
router.post("/register", apiLimiter, upload.single("resume"), validateRegisterInput, register);
router.get("/logout", logout);

export default router;
