import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsInt()
  @IsOptional()
  taskListId?: number;  // association optionnelle avec une liste
}
