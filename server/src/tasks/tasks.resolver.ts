import {Mutation, Resolver, Query, Args} from '@nestjs/graphql';
import {TasksService} from "./tasks.service";
import {Task} from "./tasks.entity";
import {CreateTaskInput} from "./dto/create-task.input";
import {UpdateTaskInput} from "./dto/update-task";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql-auth.guard";
import {ShowTasks} from "./dto/show-tasks.input";

@Resolver(of => Task)
export class TasksResolver {
    constructor(private tasksService: TasksService) {
    }

    @Query(() => [Task])
    @UseGuards(GqlAuthGuard)
    tasks(@Args('showTasks') showTasks: ShowTasks): Promise<Task[]> {
        return this.tasksService.findAll(showTasks)
    }

    @Mutation(returns => Task, {description: "create new task"})
    createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task>{
        return this.tasksService.createTask(createTaskInput)
    }

    @Mutation(returns => Task, { description: "update all content of task" })
    updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput): Promise<Task>{
        return this.tasksService.updateTask(updateTaskInput.id , updateTaskInput)
    }

    @Mutation(() => Boolean, { description: "delete task" })
    deleteTask(@Args('id') id: number){
        return this.tasksService.deleteTask(id)
    }
}
