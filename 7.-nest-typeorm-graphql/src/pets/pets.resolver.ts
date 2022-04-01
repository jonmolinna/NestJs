import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  // Esto Graphql y el @Args
  @Mutation(() => Pet)
  // Esto es Nest.
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }

  @Query(() => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOnePet(id);
  }

  // Parent
  @ResolveField(() => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
