import {UserController} from "./controller/UserController";
import {SectionController} from "./controller/SectionController";
import {ItemController} from "./controller/ItemController";

export const Routes = [{
// User
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
// Section
    method: "get",
    route: "/sections",
    controller: SectionController,
    action: "all"
}, {
    method: "get",
    route: "/sections/:id",
    controller: SectionController,
    action: "one"
}, {
    method: "post",
    route: "/sections",
    controller: SectionController,
    action: "save"
}, {
    method: "delete",
    route: "/sections/:id",
    controller: SectionController,
    action: "remove"
}, {
// Item
    method: "get",
    route: "/items",
    controller: ItemController,
    action: "all"
}, {
    method: "get",
    route: "/items/:id",
    controller: ItemController,
    action: "one"
}, {
    method: "post",
    route: "/items",
    controller: ItemController,
    action: "save"
}, {
    method: "delete",
    route: "/items/:id",
    controller: ItemController,
    action: "remove"
}];