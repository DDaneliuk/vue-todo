import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {

    @Field()
    id: number

    @Field({nullable: true})
    taskTitle?: string;

    @Field({nullable: true})
    isDone?: boolean;
}