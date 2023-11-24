// api-versions.dto.ts

import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ApiVersionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  versions: string[];
}
