import { Allow, IsIn, IsDefined } from 'class-validator';

export class CreateTaskDto {
  @Allow()
  @IsDefined()
  name: string;
  @IsIn(['PENDING', 'DONE'])
  status: 'PENDING' | 'DONE';
}
