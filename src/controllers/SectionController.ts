import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Section } from "../entities/Section";
import msgs from "../config/messages";

class SectionController{

    static listAll = async (req: Request, res: Response) => {

        // Obtener todas las secciones contenidas en la base de datos
        const sectionRepository = getRepository(Section);
        const sections = await sectionRepository.find({
            select: ["id", "id_system", "type", "name", "icon", "position", "parent", "status"]
        });

        // Enviar el objeto sections
        res.send(sections);
    };

    static getOneById = async (req: Request, res: Response) => {
    
        // Obtener el id contenido en el url
        const id: number = parseInt(req.params.id);

        // Obtener la seccion
        const sectionRepository = getRepository(Section);

        try {
    
            const section = await sectionRepository.findOneOrFail(id, {
                select: ["id", "id_system", "type", "name", "icon", "position", "parent", "status"],
                relations: ["items"]
            });
            
            // Enviar el objeto <section>
            res.send(section);
        } 
        catch (error) {
            console.log(error);
            res.status(404).send(msgs.errors.section.sectionNotFoundWithId + " " + id);
        }
    };

    static newSection = async (req: Request, res: Response) => {

        // Obtener los datos contenidos en el body
        let { id_system, type, name, icon, position, parent, status  } = req.body;
        let section = new Section();
        section.id_system = id_system;
        section.type = type;
        section.name = name;
        section.icon = icon;
        section.position = position;
        section.parent = parent;
        section.status = status;

        // Validar los parametros
        const errors = await validate(section);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Intenta guardar los datos.
        const sectionRepository = getRepository(Section);
        try {
            await sectionRepository.save(section);
        } 
        catch (e) {
            res.status(409).send(e);
            return;
        }

        // Si todo está bien, envíar una respuesta 201
        res.status(201).send(msgs.success.section.sectionCreated);
    };

    static editSection = async (req: Request, res: Response) => {

        // Obtener el ID contenido en el url
        const id = req.params.id;

        // Obtener los datos contenidos en el body
        const { id_system, type, name, icon, position, parent, status } = req.body;

        // Obtener la seccion
        const sectionRepository = getRepository(Section);
        let section;

        console.log("Recherche de la section " + id);

        try {
            section = await sectionRepository.findOneOrFail(id);
        }
        catch (error) {
            // Si no lo obtiene, enviar una error 404
            res.status(404).send(msgs.errors.section.sectionNotFoundWithId + " " + id);
            return;
        }

        // Validar los nuevos valores en el modelo
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

        // Intentar salvar los datos en la base de datos. 
        try {
            await sectionRepository.save(section);
        }
        catch (e) {
            res.status(409).send(e);
            return;
        }
        // Envíar una respuesta 204 (sin contenido, pero aceptada)
        res.status(204).send();
    };

    static deleteSection = async (req: Request, res: Response) => {

        // Obtener el ID contenido en el url
        const id = req.params.id;

        const sectionRepository = getRepository(Section);
        let section: Section;
        
        try {
            section = await sectionRepository.findOneOrFail(id);
        }
        catch (error) {
            res.status(404).send(msgs.errors.section.sectionNotFoundWithId + " " + id);
            return;
        }
        sectionRepository.delete(id);

        // Envíar una respuesta 204 (sin contenido, pero aceptada)
        res.status(204).send();
    };
};

export default SectionController;