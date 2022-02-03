import {Injectable} from "@nestjs/common";
import {Task} from "./tasks.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTaskInput} from "./dto/create-task.input";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {
    }

    createTask(createTaskInput: CreateTaskInput): Promise<Task>{
        const newTask = this.tasksRepository.create(createTaskInput); // newTask = new Task(); new.taskTitle = input.taskTitle
        return this.tasksRepository.save(newTask) // insert task to db
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find(); // SELECT * FROM tasks
    }
}