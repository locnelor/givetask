import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { UserService } from 'src/user/user.service';
import { WorkService } from 'src/work/work.service';
import { UserEntity } from 'src/user/user.entity';
import { WorkEntity } from 'src/work/work.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    UserModule
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule { }
