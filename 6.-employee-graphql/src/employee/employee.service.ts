import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: any) {
    return this.employeeRepository.findOne(id);
  }

  async create(employee: EmployeeCreateDTO): Promise<Employee> {
    const emp = this.employeeRepository.create(employee);
    return await this.employeeRepository.save(emp);
  }

  async getProject(id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }
}
