import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Ruta para obtener todos los users
// router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
router.get("/", UserController.listAll);

// Ruta para obtener un user
// router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.getOneById);
router.get("/:id([0-9]+)", UserController.getOneById);

// Ruta para crear un nuevo user
// router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);
router.post("/", UserController.newUser);

// Ruta para modificar los datos de un user
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.editUser);
router.patch("/:id([0-9]+)", UserController.editUser);

// Ruta para borrar un user
// router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.deleteUser);
router.delete("/:id([0-9]+)", UserController.deleteUser);

export default router;