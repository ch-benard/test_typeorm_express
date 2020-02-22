import { Router, Request, Response } from "express";
import item from "./item";
import section from "./section";
import user from "./user";

const routes = Router();

routes.use("/item", item);
routes.use("/section", section);
routes.use("/user", user);

export default routes;