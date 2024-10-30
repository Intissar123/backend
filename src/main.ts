import { NestFactory } from '@nestjs/core';
require("dotenv").config();
import { AppModule } from './app.module';
const db = require('../models');
async function bootstrap() {
  //na3mlou activation mta3 code lil localhost
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['*'],
    credentials: true,
  });
  
  await app.listen(5000);
}

bootstrap();