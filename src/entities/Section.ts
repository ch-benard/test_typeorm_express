import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
