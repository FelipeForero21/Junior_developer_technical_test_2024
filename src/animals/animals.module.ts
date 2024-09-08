import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Corral } from 'src/corrals/entities/corral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Corral])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
