import { Router } from "express";
import SectionController from "../controllers/SectionController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Ruta para obtener todas las secciones
// router.get("/", [checkJwt, checkRole(["ADMIN"])], SectionController.listAll);
router.get("/", SectionController.listAll);

// Ruta para obtener una seccion
// router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], SectionController.getOneById);
router.get("/:id([0-9]+)", SectionController.getOneById);

// Ruta para crear una nueva seccion
// router.post("/", [checkJwt, checkRole(["ADMIN"])], SectionController.newSection);
router.post("/", SectionController.newSection);

// Ruta para modificar los datos de una seccion
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], SectionController.editSection);
router.put("/:id([0-9]+)", SectionController.editSection);

// Ruta para borrar una seccion
// router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], SectionController.deleteSection);
router.delete("/:id([0-9]+)", SectionController.deleteSection);

export default router;