import { IsOptional, IsIn } from 'class-validator';

export class TasksFilterDto {
  @IsOptional()
  @IsIn(['PENDING', 'DONE'])
  status: 'PENDING' | 'DONE';
}
