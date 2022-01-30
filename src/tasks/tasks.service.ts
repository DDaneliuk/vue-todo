import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Task} from "./tasks.entity";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {
    }

    async createTask(newTask) {
        const task = await this.tasksRepository.save(newTask)
        return task
    }

    findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    findOne(id: string): Promise<Task> {
        return this.tasksRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}
