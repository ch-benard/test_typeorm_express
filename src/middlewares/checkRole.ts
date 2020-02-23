import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Obtener el id del user ID del previo middleware 
    const id = res.locals.jwtPayload.userId;

    // Obtener el user role de la base de datos
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    // Compruebe si la matriz de roles autorizados incluye el rol del usuario
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};