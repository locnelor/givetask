import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';
import { WorkModule } from 'src/work/work.module';

@Module({
  imports: [
    UserModule,
    TaskModule,
    WorkModule
  ],
  providers: [SystemService],
  controllers: [SystemController]
})
export class SystemModule { }
