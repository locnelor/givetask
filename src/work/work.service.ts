import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(WorkEntity)
        public readonly work: Repository<WorkEntity>
    ) { }
}
