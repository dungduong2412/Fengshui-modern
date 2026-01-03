import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async listServices(@Query('env') env: 'uat' | 'prod') {
    return this.servicesService.findByEnvironment(env);
  }

  @Get(':id')
  async getService(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }

  @Post()
  async createService(@Body() data: any) {
    return this.servicesService.create(data);
  }
}
