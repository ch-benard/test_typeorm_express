import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import srvConfig from "./config/server-config";

// connecta a la base de datos y crea una instancia de express
createConnection()
  .then(async connection => {
    // Nueva instancia de express
    const app = express();

    // carga los midlewares
    // app.use(cors());
    // app.use(helmet());
    app.use(bodyParser.json());

    // sube las rutas desde el directorio "routes"
    app.use("/", routes);

    app.listen(srvConfig.port, () => {
      console.log('Server started on port ', srvConfig.port);
    });
  })
  .catch(error => console.log(error));