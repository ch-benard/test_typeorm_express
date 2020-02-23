import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entities/User";
import msgs from "../config/messages";

class UserController {

    static listAll = async (req: Request, res: Response) => {

        // Obtener todos los usuarios contenidos en la base de datos
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "role"] // lista de columnas de la tabla "user" sin la contraseña 
        });

        // Enviar el objeto users
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {

        // Obtener el id contenido en el url
        const id: number = parseInt(req.params.id);

        // Obtener el user
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "username", "role"] // lista de columnas de la tabla "user" sin la contraseña
            });
            // Enviar el objeto user
            res.send(user);
        }
        catch (error) {
            res.status(404).send(msgs.errors.users.userNotFound);
        }
    };

    static newUser = async (req: Request, res: Response) => {

        // Obtener los datos contenidos en el body
        let { username, password, role } = req.body;
        let user = new User();
        user.username = username;
        user.password = password;
        user.role = role;

        // Validar los parametros
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Hash de la contraseña, para almacenar de forma segura en la base de datos
        user.hashPassword();

        // Intenta guardar los datos.
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        }
        catch (e) {
            res.status(409).send(e);
        return;
        }

        // Si todo está bien, envíar una respuesta 201
        res.status(201).send(msgs.success.users.userCreated);
    };

    static editUser = async (req: Request, res: Response) => {

        // Obtener el ID contenido en el url
        const id = req.params.id;

        // Obtener los datos contenidos en el body
        const { username, role } = req.body;

        // Obtener el user
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        }
        catch (error) {
            // Si no lo obtiene, enviar una error 404
            res.status(404).send(msgs.errors.users.userNotFound);
            return;
        }

        // Validar los nuevos valores en el modelo
        user.username = username;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Intentar salvar los datos en la base de datos. 
        try {
            await userRepository.save(user);
        }
        catch (e) {
            res.status(409).send(e);
            return;
        }
        // Envíar una respuesta 204 (sin contenido, pero aceptada)
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        
        // Obtener el ID contenido en el url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
        user = await userRepository.findOneOrFail(id);
        }
        catch (error) {
        res.status(404).send(msgs.errors.users.userNotFound);
        return;
        }
        userRepository.delete(id);

        // Envíar una respuesta 204 (sin contenido, pero aceptada)
        res.status(204).send();
    };
};

export default UserController;