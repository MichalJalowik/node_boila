import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.model';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  findAll(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  findOne(id: bigint): Promise<Character | null> {
    return this.characterRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.characterRepository.delete(id);
  }
}
