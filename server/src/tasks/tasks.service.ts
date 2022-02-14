import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Task} from "./tasks.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTaskInput} from "./dto/create-task.input";
import {UpdateTaskInput} from "./dto/update-task";
import {ShowTasks} from "./dto/show-tasks.input";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {
    }

    createTask(createTaskInput: CreateTaskInput): Promise<Task> {
        try {
            const newTask = this.tasksRepository.create(createTaskInput);
            return this.tasksRepository.save(newTask) // insert task to db
        } catch (e) {
            console.log("Error - creating task", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

    async findAll(showTasks: ShowTasks): Promise<Task[]> {
        try {
            return this.tasksRepository.find({where: {userId: showTasks.userId}}); // SELECT * FROM tasks
        } catch (e) {
            console.log("Error - finding all tasks", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }


    async updateTask(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
        try {

            const taskID = await this.tasksRepository.findOne({where: {id: id}});

            return await this.tasksRepository.save({
                ...taskID,
                ...updateTaskInput
            });
        } catch (e) {
            console.log("Error - updating task", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    async deleteTask(id: number): Promise<Boolean> {
        try {
            await this.tasksRepository.delete(id)
            return true
        } catch (e) {
            console.log("Error - deleting task", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }
}