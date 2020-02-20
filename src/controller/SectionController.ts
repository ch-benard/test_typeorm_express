import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Section} from "../entity/Section";

export class SectionController {

    private sectionRepository = getRepository(Section);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.sectionRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.sectionRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.sectionRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let sectionToRemove = await this.sectionRepository.findOne(request.params.id);
        await this.sectionRepository.remove(sectionToRemove);
    }

}