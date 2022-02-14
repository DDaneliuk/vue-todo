import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver'
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '6000s'}
        })],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
