import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Section } from "../entities/Section";

class SectionController{

    static listAll = async (req: Request, res: Response) => {

        //Get sections from database
        const sectionRepository = getRepository(Section);
        const sections = await sectionRepository.find({
            select: ["id", "id_system", "type", "name", "icon", "position", "parent", "status"]
        });

        //Send the sections object
        res.send(sections);
    };

    static getOneById = async (req: Request, res: Response) => {
    
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the section from database
        const sectionRepository = getRepository(Section);

        try {
    
            const section = await sectionRepository.findOneOrFail(id, {
                select: ["id", "id_system", "type", "name", "icon", "position", "parent", "status"]
            });
        } 
        catch (error) {
            res.status(404).send("Section not found");
        }
    };

    static newSection = async (req: Request, res: Response) => {

        //Get parameters from the body
        let { id_system, type, name, icon, position, parent, status  } = req.body;
        let section = new Section();
        section.id_system = id_system;
        section.type = type;
        section.name = name;
        section.icon = icon;
        section.position = position;
        section.parent = parent;
        section.status = status;

        //Validade if the parameters are ok
        const errors = await validate(section);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the name is already in use
        const sectionRepository = getRepository(Section);
        try {
            await sectionRepository.save(section);
        } 
        catch (e) {
            res.status(409).send("name already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Section created");
    };

    static editSection = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { id_system, type, name, icon, position, parent, status } = req.body;

        //Try to find section on database
        const sectionRepository = getRepository(Section);
        let section;
        try {
            section = await sectionRepository.findOneOrFail(id);
        }
        catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Section not found");
            return;
        }

        //Validate the new values on model
        section.id_system = id_system;
        section.type = type;
        section.name = name;
        section.icon = icon;
        section.position = position;
        section.parent = parent;
        section.status = status;

        const errors = await validate(section);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means name already in use
        try {
            await sectionRepository.save(section);
        }
        catch (e) {
            res.status(409).send("name already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteSection = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        const sectionRepository = getRepository(Section);
        let section: Section;
        
        try {
            section = await sectionRepository.findOneOrFail(id);
        }
        catch (error) {
            res.status(404).send("Section not found");
            return;
        }
        sectionRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default SectionController;