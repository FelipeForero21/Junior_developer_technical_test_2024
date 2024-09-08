import { CorralsService } from './corrals.service';
import { Corral } from './entities/corral.entity';
import { CreateCorralDto } from './dto/create-corral.dto';
export declare class CorralsController {
    private readonly corralsService;
    constructor(corralsService: CorralsService);
    findAll(): Promise<Corral[]>;
    findOne(id: string): Promise<Corral>;
    create(createCorralDto: CreateCorralDto): Promise<Corral>;
    update(id: string, corral: Corral): Promise<Corral>;
    remove(id: string): Promise<void>;
}
