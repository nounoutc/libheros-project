import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;
}
