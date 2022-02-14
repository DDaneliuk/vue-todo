import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "../tasks/tasks.entity";

@Entity()
@ObjectType()
export class User{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @OneToMany(() => Task, task => task.user)
    task: Task[];
}