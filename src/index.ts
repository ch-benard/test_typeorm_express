import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import {Section} from "./entity/Section";
import {Item} from "./entity/Item";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    // insert new sections for test
    // await connection.manager.save(connection.manager.create(Section, {
    //     id_system: 1,
    //     type: "Some section type",
    //     name: "Fichier",
    //     icon: "Url to icon for this section",
    //     position: 1,
    //     parent: 0,
    //     status: 1
    // }));

    // // insert new Item for test
    // await connection.manager.save(connection.manager.create(Item, {
    //     url: "Some url",
    //     name: "Nouvelle fenêtre",
    //     id_section: 1,
    //     position: 2,
    //     icon: "Url to icon for this item",
    //     status: 1
    // }));


    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
