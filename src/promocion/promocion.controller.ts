import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';

@Controller('promocion')
export class PromocionController {
  constructor(private readonly promocionService: PromocionService) {}

  @Post()
  create(@Body() createPromocionDto: CreatePromocionDto) {
    return this.promocionService.create(createPromocionDto);
  }

  @Get()
  findAll() {
    return this.promocionService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.promocionService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromocionDto: UpdatePromocionDto) {
    return this.promocionService.update(id, updatePromocionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promocionService.remove(id);
  }
}
