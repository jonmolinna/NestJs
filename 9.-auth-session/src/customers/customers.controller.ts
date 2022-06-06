import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return res.status(HttpStatus.OK).json(customer);
    } else {
      throw new NotFoundException('Customer not found');
    }
  }

  @Get('/search/:id')
  searchCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return res.status(HttpStatus.OK).json(customer);
    } else {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  getAllCustomer() {
    return this.customersService.getCustomers();
  }

  @Post('/create')
  @UsePipes(ValidationPipe) // Para que la validacion funcione
  createCustomer(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    // console.log(createCustomerDto);
    const customer = this.customersService.createCustomer(createCustomerDto);
    if (customer) {
      return res.status(HttpStatus.OK).json({ msg: 'Customer Created' });
    } else {
      throw new HttpException('Customer failed', HttpStatus.BAD_REQUEST);
    }
  }
}
