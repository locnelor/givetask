import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
    constructor(
        private readonly userService: UserService,
        private readonly workService: WorkService
    ) { }

    @Post("addWork")
    public addWork(
        @Body() { name, comment, deadline }
    ) {
        return this.workService.work.save(
            this.workService.work.create({
                name,
                comment,
                deadline
            })
        )
    }

    @Get(":id/download")
    public download(
        @Param("id") id: number
    ) {

    }

    @Get(":id/delWork")
    delWork(
        @Param("id") id
    ) {
        // return this.workService.work.delete({
        //     id
        // })
    }
}
