import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(project: CreateProjectInput): Promise<Project> {
    const proj = this.projectRepository.create(project);
    return this.projectRepository.save(proj); // you can directly use this create. depends on DTO
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['employees'] });
  }

  async findOne(id: any): Promise<Project> {
    return await this.projectRepository.findOne({
      relations: ['employees'],
      where: {
        id,
      },
    });
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    const project: Project = this.projectRepository.create(updateProjectInput);
    project.id = id;
    return this.projectRepository.save(project);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
