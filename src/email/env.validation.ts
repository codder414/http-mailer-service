import { plainToClass } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsPort,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsPort()
  APP_DEBUG_PORT: string;

  @IsPort()
  APP_PORT: string;

  @IsString()
  MONGODB_URL: string;

  @IsString()
  MONGODB_DBNAME: string;

  @IsEmail()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASS: string;

  @IsUrl()
  SMTP_HOST: string;

  @IsPort()
  SMTP_PORT: string;

  @IsPort()
  REDIS_PORT: string;

  @IsNumber()
  REDIS_DB: number;

  @IsString()
  REDIS_HOST: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    // console.log(errors);
    throw `Error\n${errors
      .map(({ constraints }) =>
        Object.entries(constraints)
          .map(([k, v]) => `\t${k} => ${v}`)
          .join('\n'),
      )
      .join('\n')}`;
  }
  return validatedConfig;
}
