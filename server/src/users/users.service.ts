import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {User} from './user.entity'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserInput} from "./dto/create-user.input";
import * as bcrypt from "bcrypt";
import {brcyptSalt} from "../auth/constants";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async createUser(createUserInput: CreateUserInput): Promise<User>{
        try{
            let newUser = this.usersRepository.create(createUserInput);
            const hash = await bcrypt.hash(newUser.password, brcyptSalt.salt)
            newUser.password = hash
            return this.usersRepository.save(newUser)
        } catch (e){
            console.log(e)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

    async findAll(): Promise<User[]>{
        try{
            return await this.usersRepository.find()
        }catch (e) {
            console.log(e)
        }
    }
    async getUser(email: string): Promise<User>{
        try{
            const user = await this.usersRepository.findOne({where: {email:email}})
            return user
        }catch (e) {
            console.log(e)
        }
    }
}
