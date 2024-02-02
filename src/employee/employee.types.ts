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
