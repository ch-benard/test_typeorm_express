import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import { Item } from "./Item";
@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_system: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column()
    position: number;

    @Column()
    parent: number;

    @Column()
    status: number;

    @OneToMany(type => Item, item => item.section)
    items: Item[];
}
