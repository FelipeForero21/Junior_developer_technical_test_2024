import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorralsService } from './corrals.service';
import { CorralsController } from './corrals.controller';
import { Corral } from './entities/corral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Corral])],
  controllers: [CorralsController],
  providers: [CorralsService],
})
export class CorralsModule {}
