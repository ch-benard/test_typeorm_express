import { Router } from "express";
import ItemController from "../controllers/ItemController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Ruta para obtener todos los items
// router.get("/", [checkJwt, checkRole(["ADMIN"])], ItemController.listAll);
router.get("/", ItemController.listAll);

// Ruta para obtener un item
// router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], ItemController.getOneById);
router.get("/:id([0-9]+)", ItemController.getOneById);

// Ruta para crear un nuevo item
// router.post("/", [checkJwt, checkRole(["ADMIN"])], ItemController.newItem);
router.post("/", ItemController.newItem);

// Ruta para modificar los datos de un item
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], ItemController.editItem);
router.patch("/:id([0-9]+)", ItemController.editItem);

// Ruta para borrar un item
// router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], ItemController.deleteItem);
router.delete("/:id([0-9]+)", ItemController.deleteItem);

export default router;