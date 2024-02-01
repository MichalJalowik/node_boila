// import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
// import { Character } from './user.model';

export enum Department {
  FIN = 'finance',
  ENG = 'engineering',
  HR = 'human_resources',
}

export interface EmployeeType {
  firstname: string;
  lastname: string;
  department: Department;
  title: string;
  salary: number;
  date_of_birth?: Date;
  date_of_joining: Date;
}

// export class CharacterDto {
//   @IsNotEmpty()
//   name!: string;

//   @IsEnum(Episodes, { each: true })
//   episodes: Episodes[];

//   @IsOptional()
//   planet?: string;
// }

// export interface CharacterPaginatedResponse {
//   data: Character[];
//   count: number;
//   total: number;
//   page: number;
//   pageCount: number;
// }
