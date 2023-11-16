import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum Episodes {
  NEWHOPE = 'NewHope',
  EMPIRE = 'Empire',
  JEDI = 'Jedi',
}

export interface CharacterType {
  name: string;
  episodes: Episodes[];
  planet?: string;
}

export class CharacterDto {
  @IsNotEmpty()
  name!: string;

  @IsEnum(Episodes, { each: true })
  episodes: Episodes[];

  @IsOptional()
  planet?: string;
}
