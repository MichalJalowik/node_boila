import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './utils/dbConfig';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envfiles/local.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...getDbConfig(true) }),
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
