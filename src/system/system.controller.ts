import { Body, Controller, Get, NotFoundException, Param, Post, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { DeepMakeDir, DeepUnlinkDir, WorkEntity, createUid } from 'src/work/work.entity';
import { WorkService } from 'src/work/work.service';
import { Like } from 'typeorm';
import { SystemService } from './system.service';
import { pipe } from 'rxjs';
const { zip } = require("compressing")

@Controller('/')
export class SystemController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService,
        private readonly workService: WorkService,
        private readonly systemService: SystemService
    ) {
    }

    @Get("user/search")
    searchUser(
        @Query("s") s: string
    ) {
        return this.userService.user.find({
            where: [{
                name: Like(`%${s}%`)
            }, {
                idcard: Like(`%${s}%`)
            }]
        })
    }

    @Get("work/get")
    getWorks() {
        return this.workService.work.find({
            order: {
                id: 'desc'
            },
            take: 10
        })
    }

    @Get(":id/download")
    async download(
        @Param("id") id: number,
        @Res() res: Response
    ) {
        const work = await this.workService.work.findOne({ where: { id } });
        if (!work) throw NotFoundException
        const source = WorkEntity.getWorkDir(work);
        console.log(zip)
        const stream = new zip.Stream();
        stream.addEntry(source)
        stream.pipe(res)
    }

    @Post("task/submit")
    @UseInterceptors(FilesInterceptor('files'))
    async submit(
        @Body() { workid, userid },
        @UploadedFiles() files: Array<any>
    ) {
        const work = await this.workService.work.findOne({ where: { id: workid } })
        const user = await this.userService.user.findOne({ where: { id: userid } })
        if (!work || !user) throw NotFoundException
        const path = WorkEntity.getUserWorkDir(work, user)
        if (existsSync(path)) DeepUnlinkDir(path)
        DeepMakeDir(path);
        for (const { buffer, originalname } of files) {
            const suffix = originalname.slice(originalname.lastIndexOf(".") + 1);
            const name = createUid([suffix]);
            const out = join(path, name);
            writeFileSync(out, buffer)
        }
    }

    @Get("work/:id/del")
    async delTask(
        @Param("id") id: number
    ) {
        const work = await this.workService.work.findOne({ where: { id } })
        if (!work) throw NotFoundException
        await this.taskService.task.delete({
            work: {
                id: work.id
            }
        })
        await this.workService.work.delete({
            id: work.id
        })
        DeepUnlinkDir(WorkEntity.getWorkDir(work))
    }

    @Post("work/publish")
    publish(
        @Body() body
    ) {
        return this.workService.work.save(
            this.workService.work.create(body)
        )
    }

    @Get("work/:id/information")
    async information(
        @Param("id") id: number
    ) {
        const work = await this.workService.work.findOne({ where: { id }, relations: ["tasks", "tasks.user"] })
        const users = await this.userService.user.find();
        const taskMap = work.tasks.reduce((acc, item) => {
            acc[item.user.id] = item.user
            return acc;
        }, {})
        return users.map((user) => {
            return {
                ...user,
                isFinished: !!taskMap[user.id]
            }
        })
    }
}

