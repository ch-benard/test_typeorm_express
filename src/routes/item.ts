import { Router } from "express";
import ItemController from "../controllers/ItemController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all items
// router.get("/", [checkJwt, checkRole(["ADMIN"])], ItemController.listAll);
router.get("/", ItemController.listAll);

// Get one item
// router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], ItemController.getOneById);
router.get("/:id([0-9]+)", ItemController.getOneById);

//Create a new item
// router.post("/", [checkJwt, checkRole(["ADMIN"])], ItemController.newItem);
router.post("/", ItemController.newItem);

//Edit one item
// router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], ItemController.editItem);
router.patch("/:id([0-9]+)", ItemController.editItem);

//Delete one item
// router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], ItemController.deleteItem);
router.delete("/:id([0-9]+)", ItemController.deleteItem);

export default router;