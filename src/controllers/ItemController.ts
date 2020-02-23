import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Item } from "../entities/Item";
import msgs from "../config/messages";

class ItemController{

    static listAll = async (req: Request, res: Response) => {

        // Obtener todos los items contenidos en la base de datos
        const itemRepository = getRepository(Item);
        const items = await itemRepository.find({
            select: ["id", "url", "name", "id_section", "position", "icon", "status"]
        });

        // Enviar el objeto items
        res.send(items);
    };

    static getOneById = async (req: Request, res: Response) => {
    
        // Obtener el id contenido en el url
        const id: number = parseInt(req.params.id);

        // Obtener el item
        const itemRepository = getRepository(Item);

        try {
    
            const item = await itemRepository.findOneOrFail(id, {
                select: ["id", "url", "name", "id_section", "position", "icon", "status"]
            });
            // Enviar el objeto item
            res.send(item);
        } 
        catch (error) {
            res.status(404).send(msgs.errors.item.itemNotFoundWithId + " " + id);
        }
    };

    static newItem = async (req: Request, res: Response) => {

        // Obtener los datos contenidos en el body
        let { url, name, id_section, position, icon, status  } = req.body;
        let item = new Item();
        item.url = url;
        item.name = name;
        item.id_section = id_section;
        item.position = position;
        item.icon  = icon ;
        item.status = status;

        // Validar los parametros
        const errors = await validate(item);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Intenta guardar los datos.
        const itemRepository = getRepository(Item);
        try {
            await itemRepository.save(item);
        } 
        catch (e) {
            res.status(409).send(e);
            return;
        }

        // Si todo está bien, envíar una respuesta 201
        res.status(201).send(msgs.success.item.itemCreated);
    };

    static editItem = async (req: Request, res: Response) => {

        // Obtener el ID contenido en el url
        const id = req.params.id;

        // Obtener los datos contenidos en el body
        const { url, name, id_section, position, icon, status } = req.body;

        // Obtener el item
        const itemRepository = getRepository(Item);
        let item;
        try {
            item = await itemRepository.findOneOrFail(id);
        }
        catch (error) {
            // Si no lo obtiene, enviar una error 404
            res.status(404).send(msgs.errors.item.itemNotFoundWithId + " " + id);
            return;
        }

        // Validar los nuevos valores en el modelo
        item.url = url;
        item.name = name;
        item.id_section = id_section;
        item.position = position;
        item.icon  = icon ;
        item.status = status;

        const errors = await validate(item);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Intentar salvar los datos en la base de datos. 
        try {
            await itemRepository.save(item);
        }
        catch (e) {
            res.status(409).send(e);
            return;
        }
        // Envíar una respuesta 204 (sin contenido, pero aceptada)
        res.status(204).send();
    };

    static deleteItem = async (req: Request, res: Response) => {

        // Obtener el ID contenido en el url
        const id = req.params.id;

        const itemRepository = getRepository(Item);
        let item: Item;
        
        try {
            item = await itemRepository.findOneOrFail(id);
        }
        catch (error) {
            res.status(404).send(msgs.errors.item.itemNotFoundWithId + " " + id);
            return;
        }
        itemRepository.delete(id);

        // Envíar una respuesta 204 (sin contenido, pero aceptada)
        res.status(204).send();
    };
};

export default ItemController;