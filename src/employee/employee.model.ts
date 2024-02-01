import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({
    description: 'Employee id',
  })
  id!: bigint;

  @Column({
    type: 'text',
  })
  @ApiProperty({
    description: `Employee first name`,
  })
  firstname!: string;

  @Column({
    type: 'text',
  })
  @ApiProperty({
    description: `Employee last name`,
  })
  lastname!: string;

  @Column({
    type: 'text',
  })
  @ApiProperty({ description: 'Department' })
  department!: string;

  @Column({
    type: 'text',
  })
  @ApiProperty({
    description: `Employee title`,
  })
  title!: string;

  @Column({
    type: 'bigint',
  })
  @ApiProperty({
    description: `Employee monthly compensation`,
  })
  salary!: number;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  @ApiProperty({
    description: `Employee date of birth`,
  })
  date_of_birth?: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  @ApiProperty({
    description: `Employee date of joining`,
  })
  date_of_joining!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
