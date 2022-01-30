import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: "tasks" })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taskTitle: string;

    @Column({default: false})
    isDone:boolean;
}