import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { AppModule } from '../app.module';
import { Factory, getFactory } from '../utils/factoryGirl';
import { Character } from './character.model';
import { CharacterPaginatedResponse, Episodes } from './character.types';

describe('Character', () => {
  let app: INestApplication;
  let source: DataSource;
  let factory: Factory;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
        transform: true,
      }),
    );
    source = testingModule.get<DataSource>(DataSource);
    factory = getFactory(source);
    await app.init();
  });

  afterAll(async () => {
    if (!module || !source) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of source.migrations) {
      await source.undoLastMigration();
    }
  });

  describe('Character controller', () => {
    it('returns all characters', async () => {
      const response = await request(app.getHttpServer())
        .get('/character')
        .expect(200);

      const data = response.body as Character[];
      expect(data.length).toEqual(4);
    });

    it('episodes validation - should fail with proper information', async () => {
      const body = {
        name: 'Baby Yoda',
        episodes: ['Wrong'],
        planet: 'Earth',
      };

      const response = await request(app.getHttpServer())
        .post('/character')
        .send(body)
        .expect(400);

      const data = response.body as Error;
      expect(data.message).toEqual(
        expect.arrayContaining([
          'each value in episodes must be one of the following values: NewHope, Empire, Jedi',
        ]),
      );
    });

    it('should add correct Character', async () => {
      const body = {
        name: 'Baby Yoda',
        episodes: [Episodes.NEWHOPE],
        planet: 'Earth',
      };

      await request(app.getHttpServer())
        .post('/character')
        .send(body)
        .expect(201);

      const totalCharacters = await source.manager.count(Character);
      expect(totalCharacters).toEqual(5);
    });

    it('pagination - should responsd with second page', async () => {
      const response = await request(app.getHttpServer())
        .get('/character?limit=2&page=2')
        .expect(200);

      const data = response.body as CharacterPaginatedResponse;
      expect(data.data.length).toEqual(2);
      expect(data.data[0].id).toEqual('3');
      expect(data.data[1].id).toEqual('4');
    });

    it('should delete newly created Character', async () => {
      const countBefore = await source.manager.count(Character);
      expect(countBefore).toEqual(5);

      const newlyCreatedRecord = await factory.create<Character>('Character', {
        episodes: [Episodes.EMPIRE],
      });

      const countAfterAdd = await source.manager.count(Character);
      expect(countAfterAdd).toEqual(6);

      await request(app.getHttpServer())
        .delete(`/character/${newlyCreatedRecord.id}`)
        .expect(200);

      const countAfter = await source.manager.count(Character);
      expect(countAfter).toEqual(5);

      const recordWithDeletedId = await source.manager.count(Character, {
        where: { id: newlyCreatedRecord.id },
      });
      expect(recordWithDeletedId).toEqual(0);
    });
  });
});
