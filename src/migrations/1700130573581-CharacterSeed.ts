import { MigrationInterface, QueryRunner } from 'typeorm';
import { Character } from '../character/character.model';
import { CharacterType, Episodes } from '../character/character.types';

const dataSeed: CharacterType[] = [
  {
    name: 'Luke Skywalker',
    episodes: [Episodes.EMPIRE, Episodes.JEDI, Episodes.NEWHOPE],
  },
  {
    name: 'Darth Vader',
    episodes: [Episodes.EMPIRE, Episodes.JEDI, Episodes.NEWHOPE],
  },
  {
    name: 'Han Solo',
    episodes: [Episodes.EMPIRE, Episodes.JEDI, Episodes.NEWHOPE],
  },
  {
    name: 'Leia Organa',
    episodes: [Episodes.EMPIRE, Episodes.JEDI, Episodes.NEWHOPE],
    planet: 'Alderaan',
  },
];

export class CharacterSeed1700130573581 implements MigrationInterface {
  name = 'CharacterSeed1700130573581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const characterRepo =
      queryRunner.manager.getRepository<Character>(Character);

    for (const character of dataSeed) {
      characterRepo.save(character);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const characterRepo =
      queryRunner.manager.getRepository<Character>(Character);
    for (const character of dataSeed) {
      const match = await characterRepo.find({
        where: { name: character.name },
      });
      await characterRepo.remove(match);
    }
  }
}
