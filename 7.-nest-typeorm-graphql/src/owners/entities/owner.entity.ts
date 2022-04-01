import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field() // Los @Field son los graphql
  name: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[]; // ? puede ser nulo
}
