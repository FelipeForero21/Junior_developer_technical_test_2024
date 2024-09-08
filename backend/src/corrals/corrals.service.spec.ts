import { Test, TestingModule } from '@nestjs/testing';
import { CorralsService } from './corrals.service';

describe('CorralsService', () => {
  let service: CorralsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorralsService],
    }).compile();

    service = module.get<CorralsService>(CorralsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
