import { User, Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export class CreateUserDto implements Omit<User, 'id'> {
  @Length(2, 100)
  @IsString()
  firstName: string;

  @Length(2, 100)
  @IsString()
  lastName: string;

  // TODO Defile phone validation
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  // TODO enhance validation
  @Length(8, 64)
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
