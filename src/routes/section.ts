import { Router } from "express";
import SectionController from "../controllers/SectionController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all sections
// router.get("/", [checkJwt, checkRole(["ADMIN"])], SectionController.listAll);
router.get("/", SectionController.listAll);

// Get one section
// router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], SectionController.getOneById);
router.get("/:id([0-9]+)", SectionController.getOneById);

//Create a new section
// router.post("/", [checkJwt, checkRole(["ADMIN"])], SectionController.newSection);
router.post("/", SectionController.newSection);

//Edit one section
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], SectionController.editSection);
router.patch("/:id([0-9]+)", SectionController.editSection);

//Delete one section
// router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], SectionController.deleteSection);
router.delete("/:id([0-9]+)", SectionController.deleteSection);

export default router;