import { Controller, Get } from '@nestjs/common';
import { Character } from './character.model';
import { Crud } from '@dataui/crud';
import { CharacterCrudService } from './character.crud.service';
import { CharacterDto } from './character.types';
import { CharacterService } from './character.service';

@Crud({
  model: {
    type: Character,
  },
  dto: {
    create: CharacterDto,
    update: CharacterDto,
    replace: CharacterDto,
  },
})
@Controller('character')
export class CharacterCrudController {
  constructor(
    public service: CharacterCrudService,
    public customService: CharacterService,
  ) {}

  @Get('all')
  getCharacters(): Promise<Character[]> {
    return this.customService.findAll();
  }
}
