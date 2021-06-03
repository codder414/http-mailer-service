import {
  IsNotEmpty,
  IsEmail,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
export class SendEmailDto {
  @IsNotEmpty()
  @Length(1, 1000)
  subject: string;

  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(65536)
  body: string;
}
