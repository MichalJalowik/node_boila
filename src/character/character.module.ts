import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { CharacterCrudService } from './character.crud.service';
import { CharacterCrudController } from './character.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService, CharacterCrudService],
  exports: [CharacterService, CharacterCrudService],
  controllers: [CharacterCrudController],
})
export class CharacterModule {}
