import { DataSource } from 'typeorm';
import { factory } from 'factory-girl';
import { randAnimalType, randDog } from '@ngneat/falso';
import { Character } from '../character/character.model';
import { CustomTypeORMAdapter } from './customTypeOrmAdapter';

export type Factory = typeof factory;

export let factoryCached: Factory;

factory.define('Character', Character, {
  name: randAnimalType(),
  episodes: [],
  planet: randDog(),
  //   created_at: '2021-09-01T12:46:25.241Z',
  //   updated_at: '2021-09-01T12:46:25.241Z',
});

export const getFactory = (datasource: DataSource) => {
  if (!factoryCached) {
    factory.setAdapter(new CustomTypeORMAdapter(datasource));
    factoryCached = factory;
  }
  return factoryCached;
};
