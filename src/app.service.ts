import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService{
    getTasks(){
        return [{id:1643209474133, taskTitle: 123}]
    }
}
