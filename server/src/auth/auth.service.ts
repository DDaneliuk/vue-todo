import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {brcyptSalt} from "./constants";
import {LoginUserInput} from "./dto/login-user.input";
import {CreateUserInput} from "./dto/create-user.input"

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(email)
        const hash = await bcrypt.hash(password, brcyptSalt.salt)
        const isMatchPass = await bcrypt.compare(password, hash)
        if (user && isMatchPass) {
            const {password, email, ...rest} = user
            return user
        }
        return null
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.usersService.getUser(loginUserInput.email)
        if(user){
            const {password, ...result} = user;
            const payload = {email: user.email, id: user.id};
            return {
                access_token: this.jwtService.sign(payload),
                user: result,
            }
        }
        else{
            throw new HttpException('User is not register', HttpStatus.FORBIDDEN)
        }

    }

    async createUser(createUserInput: CreateUserInput) {
            const checkUser = await this.usersService.getUser(createUserInput.email)
            if (!checkUser){
                return this.usersService.createUser(createUserInput);
            }
            else {
                throw new HttpException('User already exists', HttpStatus.FORBIDDEN)
        }
    }
}
