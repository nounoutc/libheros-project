import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskListDto {
  @IsString()
  @IsOptional()
  name?: string;
}
