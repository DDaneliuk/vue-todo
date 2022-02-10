import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {brcyptSalt} from "./constants";

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

    async login(user: any) {
        const payload = {email: user.email, id: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
