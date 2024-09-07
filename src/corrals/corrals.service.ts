import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Corral } from './entities/corral.entity';

@Injectable()
export class CorralsService {
  constructor(
    @InjectRepository(Corral)
    private corralsRepository: Repository<Corral>,
  ) {}

  findAll(): Promise<Corral[]> {
    return this.corralsRepository.find();
  }

  findOne(id: number): Promise<Corral> {
    return this.corralsRepository.findOneBy({ id });
  }

  create(corral: Corral): Promise<Corral> {
    return this.corralsRepository.save(corral);
  }

  async update(id: number, corral: Corral): Promise<Corral> {
    await this.corralsRepository.update(id, corral);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.corralsRepository.delete(id);
  }
}
