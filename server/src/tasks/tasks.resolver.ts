import {Mutation, Resolver, Query, Args} from '@nestjs/graphql';
import {TasksService} from "./tasks.service";
import {Task} from "./tasks.entity";
import {CreateTaskInput} from "./dto/create-task.input";
import {UpdateTaskInput} from "./dto/update-task";

@Resolver(of => Task)
export class TasksResolver {
    constructor(private tasksService: TasksService) {
    }

    @Query(() => [Task])
    tasks(): Promise<Task[]> {
        return this.tasksService.findAll()
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
    deleteTask(@Args('id') id: string){
        return this.tasksService.deleteTask(id)
    }
}
