import { PartialType } from '@nestjs/mapped-types';
import { CreateCorralDto } from './create-corral.dto';

export class UpdateCorralDto extends PartialType(CreateCorralDto) {}
