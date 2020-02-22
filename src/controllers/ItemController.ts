import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Item } from "../entities/Item";

class ItemController{

    static listAll = async (req: Request, res: Response) => {

        //Get items from database
        const itemRepository = getRepository(Item);
        const items = await itemRepository.find({
            select: ["id", "url", "name", "id_section", "position", "icon", "status"]
        });

        //Send the items object
        res.send(items);
    };

    static getOneById = async (req: Request, res: Response) => {
    
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the item from database
        const itemRepository = getRepository(Item);

        try {
    
            const item = await itemRepository.findOneOrFail(id, {
                select: ["id", "url", "name", "id_section", "position", "icon", "status"] //We dont want to send the password on response
            });
        } 
        catch (error) {
            res.status(404).send("Item not found");
        }
    };

    static newItem = async (req: Request, res: Response) => {

        //Get parameters from the body
        let { url, name, id_section, position, icon, status  } = req.body;
        let item = new Item();
        item.url = url;
        item.name = name;
        item.id_section = id_section;
        item.position = position;
        item.icon  = icon ;
        item.status = status;

        //Validade if the parameters are ok
        const errors = await validate(item);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the name is already in use
        const itemRepository = getRepository(Item);
        try {
            await itemRepository.save(item);
        } 
        catch (e) {
            res.status(409).send("name already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Item created");
    };

    static editItem = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { url, name, id_section, position, icon, status } = req.body;

        //Try to find item on database
        const itemRepository = getRepository(Item);
        let item;
        try {
            item = await itemRepository.findOneOrFail(id);
        }
        catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Item not found");
            return;
        }

        //Validate the new values on model
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

        //Try to safe, if fails, that means name already in use
        try {
            await itemRepository.save(item);
        }
        catch (e) {
            res.status(409).send("name already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteItem = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        const itemRepository = getRepository(Item);
        let item: Item;
        
        try {
            item = await itemRepository.findOneOrFail(id);
        }
        catch (error) {
            res.status(404).send("Item not found");
            return;
        }
        itemRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default ItemController;