import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MastersService } from './masters.service';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Get('pending')
  async getPendingMasters() {
    return this.mastersService.findPending();
  }

  @Get(':id')
  async getMaster(@Param('id') id: string) {
    return this.mastersService.findById(id);
  }

  @Post(':id/profile')
  async updateProfile(@Param('id') id: string, @Body() data: any) {
    return this.mastersService.updateProfile(id, data);
  }
}
