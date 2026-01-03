import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('pending/masters')
  async getPendingMasters() {
    return this.adminService.getPendingMasters();
  }

  @Get('pending/services')
  async getPendingServices() {
    return this.adminService.getPendingServices();
  }

  @Post('approve/master/:id')
  async approveMaster(@Param('id') id: string) {
    return this.adminService.approveMaster(id);
  }

  @Post('approve/service/:id')
  async approveService(@Param('id') id: string) {
    return this.adminService.approveService(id);
  }

  @Post('promote/service/:id')
  async promoteService(@Param('id') id: string) {
    return this.adminService.promoteServiceToProd(id);
  }
}
