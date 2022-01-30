import {Body, Post, Controller, Get} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController {

    constructor( private tasksService: TasksService) {

    }

    @Post()
    create(@Body() body){
        console.log(body)
        return this.tasksService.createTask(body)
    }

    @Get()
    findAll(){
        return this.tasksService.findAll()
    }
}
