import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
// Ruta para el login
router.post("/login", AuthController.login);

// Ruta para cambiar la contraseña
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;