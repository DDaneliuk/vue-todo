import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Task} from "./tasks.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTaskInput} from "./dto/create-task.input";
import {UpdateTaskInput} from "./dto/update-task";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {
    }

    createTask(createTaskInput: CreateTaskInput): Promise<Task> {
        try {
            const newTask = this.tasksRepository.create(createTaskInput); // newTask = new Task(); new.taskTitle = input.taskTitle
            return this.tasksRepository.save(newTask) // insert task to db
        } catch (e) {
            console.log("Error - creating task", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

    async findAll(): Promise<Task[]> {
        try {
            return this.tasksRepository.find(); // SELECT * FROM tasks
        } catch (e) {
            console.log("Error - finding all tasks", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

    async updateTask(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
        try {

            const taskID = await this.tasksRepository.findOne({where: {id: id}});

            const updatedTask = await this.tasksRepository.save({
                ...taskID,
                ...updateTaskInput
            });

            return updatedTask;
        } catch (e) {
            console.log("Error - updating task", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    async deleteTask(id: number): Promise<Boolean> {
        try {
            const task = await this.tasksRepository.delete(id)
            return true
        } catch (e) {
            console.log("Error - deleting task", e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }
};