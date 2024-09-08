import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CorralsService } from './corrals.service';
import { Corral } from './entities/corral.entity';
import { CreateCorralDto } from './dto/create-corral.dto';

@Controller('corrals')
export class CorralsController {
  constructor(private readonly corralsService: CorralsService) {}

  @Get()
  findAll() {
    return this.corralsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corralsService.findOne(+id);
  }

  @Post('add')
  create(@Body() createCorralDto: CreateCorralDto) {
    const corral = this.corralsService.create(createCorralDto);
    return corral;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() corral: Corral) {
    return this.corralsService.update(+id, corral);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corralsService.remove(+id);
  }
}
