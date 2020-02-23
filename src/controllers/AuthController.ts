import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entities/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    // Compruebe si username y contraseña tienen valor
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // Obtener los datos del user de la base de datos
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    // Comprueba si la contraseña cifrada corresponde
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Signed JWT valido para 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    // Enviar el jwt el la respuesta
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    // Obtener ID del JWT
    const id = res.locals.jwtPayload.userId;

    // Obtener parametros del body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // Obtener user de la base de datos
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    // Compruebe si la contraseña anterior corresponde
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    // Validar el modelo (cantidad de caracteres en la contraseña)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Hash la nueva contraseña y guardarla en la base de datos
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;