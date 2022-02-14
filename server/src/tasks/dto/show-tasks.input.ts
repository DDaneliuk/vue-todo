import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ShowTasks {
    @Field()
    userId: number;
}