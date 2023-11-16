import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Episodes } from './character.types';

@Entity('character')
export class Character {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({
    description: 'Character id',
  })
  id!: bigint;

  @Column({
    type: 'text',
  })
  @ApiProperty({
    description: `Character name`,
  })
  name!: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  @ApiProperty({ description: 'Episodes where Character played' })
  episodes!: Episodes[];

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    description: `Character planet`,
  })
  planet?: string;
}
