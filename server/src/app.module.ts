import { AppController } from './app.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
