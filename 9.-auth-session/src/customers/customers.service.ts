import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { Customer } from './types/Customer';

@Injectable()
export class CustomersService {
  private customer: Customer[] = [
    {
      id: 1,
      email: 'kendra123@gmail.com',
      name: 'Kendra Contreras',
    },
    {
      id: 2,
      email: 'jane123@gmail.com',
      name: 'Jane Sifuentes',
    },
    {
      id: 3,
      email: 'dallase123@gmail.com',
      name: 'Dallas Contreras',
    },
  ];

  findCustomer() {
    return this.customer;
  }

  findCustomerById(id: number) {
    return this.customer.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customer.push(customerDto);
    return customerDto;
  }

  getCustomers() {
    return this.customer;
  }
}
