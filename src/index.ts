import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    // app.use(cors());
    // app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));

/*
import express from "express";
// import srvconfig from './config/server-config.json';
// const port = srvconfig.port;

import {createConnection} from "typeorm";
import { getRepository } from "typeorm";
import { User } from "./entities/User";
import { UserController } from "./controllers/UserController";
import dotenv from "dotenv";

createConnection()
    .then(async connection => {

        const app = express();

        const userRepository = getRepository(User);
        const users = await userRepository.find();  

        console.log("All users from the db: ", users);


        dotenv.config();
        const port = process.env.SERVER_PORT;
        
        // ruta para la pagina home
        app.get('/', function(req, res) {
        res.send(process.env.WELCOME);
        });
        
        // ruta para tener la lista de todos los usuarios
        app.get('/users', function(request, response) {
            // return loaded users
            response.send(users);
        });

        // ruta para tener la lista de todos los usuarios
        app.get('/users', function(request, response) {
            // return loaded users
            response.send(users);
        });

        // arranca el servidor Express
        app.listen(port, () => { console.log('Server started on port ', port) });    

    })
    .catch(error => console.log(error));
*/