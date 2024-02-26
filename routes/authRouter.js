import { Router } from "express";
import { login, register, logout } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);
router.get("/logout", logout);

export default router;
