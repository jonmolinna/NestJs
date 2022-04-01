import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';

@Module({
  providers: [OwnersResolver, OwnersService],
  imports: [TypeOrmModule.forFeature([Owner])],
  exports: [OwnersService], // Exportamos para usar en pets
})
export class OwnersModule {}
