import {Resolver} from "type-graphql";
import {AuthService} from "./auth.service";
import {Args, Mutation} from "@nestjs/graphql";
import {LoginResponse} from "./dto/login-response";
import {LoginUserInput} from "./dto/login-user.input";
import {User} from "../users/user.entity";
import {CreateUserInput} from "./dto/create-user.input";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {
    }

    @Mutation(() => LoginResponse, {description:"user login"})
    login(@Args('loginUserInput') loginUserInput: LoginUserInput){
        return this.authService.login(loginUserInput);
    }

    @Mutation(() => User, {description:"user sign up"})
    createUser(@Args('createUserInput') createUserInput: CreateUserInput){
        return this.authService.createUser(createUserInput);
    }

}