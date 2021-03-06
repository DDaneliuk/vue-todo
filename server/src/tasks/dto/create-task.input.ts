import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
    @Field()
    taskTitle: string;

    @Field()
    isDone: boolean;

    @Field()
    userId: number;
}