import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./tasks.entity";
import {TasksResolver} from './tasks.resolver';

@Module({
    providers: [TasksService, TasksResolver],
    imports: [TypeOrmModule.forFeature([Task])],
    exports: [TasksService]
})
export class TasksModule {
}
