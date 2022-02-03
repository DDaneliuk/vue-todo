import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {GraphQLModule} from "@nestjs/graphql";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TasksModule} from './tasks/tasks.module';
import {ConfigModule} from "@nestjs/config";
import {join} from 'path';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        GraphQLModule.forRoot({
            playground: true,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        }),
        ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_HOST),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            database: process.env.POSTGRES_DB,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TasksModule
    ],
})
export class AppModule {
}