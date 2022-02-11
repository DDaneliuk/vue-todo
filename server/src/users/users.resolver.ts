import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from "./user.entity";
import {UsersService} from "./users.service";
import {CreateUserInput} from "./dto/create-user.input";

@Resolver(of => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(()=> [User])
    users(): Promise<User[]>{
        return this.usersService.findAll()
    }

    @Query(() => [User])
    getUser(@Args('email') email: string): Promise<User> {
        return this.usersService.getUser(email);
    }

    @Mutation(returns => User, {description:"create new user"})
    createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User>{
        return this.usersService.createUser(createUserInput)
    }
}
