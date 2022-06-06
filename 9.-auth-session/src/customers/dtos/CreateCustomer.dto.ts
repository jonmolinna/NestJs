import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';

export class CreateCustomerDto {
  // @IsNumberString()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty() // no este vacio
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested() // valida al objeto anidado
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
