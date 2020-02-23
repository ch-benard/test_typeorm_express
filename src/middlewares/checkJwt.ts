import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el jwt token en el "head"
  const token = <string>req.headers["auth"];
  let jwtPayload;
  
  // Intentar validar el token y obtener los datos
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // Si el token no es valido, responder con 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // EL token es valido para 1 hora
  // Queremos enviar un nuevo token en cada request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  // Llamar al siguiente middleware o controller
  next();
};