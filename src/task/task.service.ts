import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        public readonly task: Repository<TaskEntity>
    ) { }
}
