import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return this.customersService.findById(id);
  }

  @Post(':id/profile')
  async updateProfile(@Param('id') id: string, @Body() data: any) {
    return this.customersService.updateProfile(id, data);
  }
}
