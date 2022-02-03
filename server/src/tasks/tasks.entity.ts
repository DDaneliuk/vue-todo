import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Task {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: string;

    @Column()
    @Field()
    taskTitle: string;

    @Column()
    @Field()
    isDone: boolean;
}