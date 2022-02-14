import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/user.entity";

@Entity()
@ObjectType()
export class Task {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    taskTitle: string;

    @Column()
    @Field()
    isDone: boolean;

    @ManyToOne(() => User, user => user.task)
    @JoinColumn()
    user: User

    @Column()
    userId: number;
}