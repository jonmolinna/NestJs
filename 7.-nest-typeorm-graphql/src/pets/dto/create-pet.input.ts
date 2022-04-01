import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field({ nullable: true }) // null para graphql
  type?: string; // ? puede ser nulo para nest

  @Field(() => Int)
  ownerId: number;
}
