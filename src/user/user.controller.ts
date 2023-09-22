import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Like } from 'typeorm';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

}
