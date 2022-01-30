import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import {ConfigModule} from "@nestjs/config";
import {Task} from "./tasks/tasks.entity";

@Module({
    controllers:[AppController],
    providers:[AppService],
    imports:[
        ConfigModule.forRoot({envFilePath:`.${process.env.NODE_ENV}.env`}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_HOST),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            database: process.env.POSTGRES_DB,
            entities: [Task],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TasksModule
    ],
})
export class AppModule {}