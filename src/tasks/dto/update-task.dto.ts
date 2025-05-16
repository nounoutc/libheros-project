import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsInt()
  @IsOptional()
  taskListId?: number;
}
