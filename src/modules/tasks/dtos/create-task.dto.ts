export class CreateTaskDto {
  name: string;
  status: 'PENDING' | 'DONE';
}
