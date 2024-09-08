import { Repository } from 'typeorm';
import { Corral } from './entities/corral.entity';
import { CreateCorralDto } from './dto/create-corral.dto';
export declare class CorralsService {
    private corralsRepository;
    constructor(corralsRepository: Repository<Corral>);
    findAll(): Promise<Corral[]>;
    findOne(id: number): Promise<Corral>;
    create(createCorralDto: CreateCorralDto): Promise<Corral>;
    update(id: number, corral: Corral): Promise<Corral>;
    remove(id: number): Promise<void>;
}
