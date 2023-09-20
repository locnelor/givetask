import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { WorkModule } from './work/work.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.orm_host,
        port: Number(process.env.orm_port),
        username: process.env.orm_username,
        password: process.env.orm_password,
        database: process.env.orm_database,
        synchronize: process.env.orm_synchronize === "true",
        dropSchema: process.env.orm_dropSchema === "true",
        logging: process.env.orm_logging === "true",
        charset: "utf8",
        entities: ["./**/*.entity.js"],
        connectorPackage: "mysql2"
      })
    }),
    TaskModule,
    WorkModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
