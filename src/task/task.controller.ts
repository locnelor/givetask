import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TaskService } from './task.service';
import { WorkService } from 'src/work/work.service';

@Controller('task')
export class TaskController {
    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService,
    ) { }

    // @Post(":id/upload")
    // @UseInterceptors()
    // public async upload(
    //     @Body() { idcard },
    //     @UploadedFiles() files,
    //     @Param("id") id: number
    // ) {
    //     const user = await this.userService.user.findOne({
    //         where: {
    //             idcard
    //         }
    //     })
    //     if (!user) throw NotFoundException
    //     const work = await this.workService.work.findOne({
    //         where: {
    //             id
    //         }
    //     })
    //     if (!work) throw NotFoundException
    //     const entity = this.taskService.task.create({
    //         user,
    //         work
    //     })
    //     console.log(files)

    // }

}
