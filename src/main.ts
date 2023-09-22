import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser"
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //设置静态
  app.useStaticAssets('build');
  app.useStaticAssets('public');

  app.use(bodyParser.json({ limit: "50mb" }))
    //跨域
    app.enableCors({
      origin(origin, callback) {
        callback(null, origin);
      },
      credentials: true,
    })
  

  await app.listen(8275);
}
bootstrap();
