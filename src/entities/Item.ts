import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Section } from "./Section";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    name: string;

    @Column()
    id_section: number;

    @Column()
    position: number;

    @Column()
    icon: string;

    @Column()
    status: number;

    @ManyToOne(type => Section, section => section.items)
    section: Section;
}
