import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity])
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule { }
