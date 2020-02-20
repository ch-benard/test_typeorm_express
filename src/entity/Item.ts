import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
