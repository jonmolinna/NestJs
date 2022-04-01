import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { OwnersModule } from '../owners/owners.module';

@Module({
  providers: [PetsService, PetsResolver],
  imports: [TypeOrmModule.forFeature([Pet]), OwnersModule], // para hacer el squema de graphql y usar owners
})
export class PetsModule {}
