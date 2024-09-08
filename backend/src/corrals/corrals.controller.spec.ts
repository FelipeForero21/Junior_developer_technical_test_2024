import { Test, TestingModule } from '@nestjs/testing';
import { CorralsController } from './corrals.controller';
import { CorralsService } from './corrals.service';

describe('CorralsController', () => {
  let controller: CorralsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorralsController],
      providers: [CorralsService],
    }).compile();

    controller = module.get<CorralsController>(CorralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
