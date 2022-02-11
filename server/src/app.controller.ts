import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {TasksService} from "./tasks/tasks.service";

@Controller()
export class AppController {
    constructor(private authService: AuthService,
                private taskService: TasksService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('tasks')
    getProfile(@Request() req) {
        return this.taskService.findAll()
    }
}
