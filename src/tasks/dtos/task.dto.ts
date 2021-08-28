import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  description: string;
}
