import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.model';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class CharacterCrudService extends TypeOrmCrudService<Character> {
  constructor(@InjectRepository(Character) repo: Repository<Character>) {
    super(repo);
  }
}
