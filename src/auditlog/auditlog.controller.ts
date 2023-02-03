import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuditlogService } from './services/auditlog.service';
import { AuditlogFilterDto } from './dto/auditlog-filter.dto';
import { Public } from '../auth/decorator/public.decorator';

@Controller('auditlog')
export class AuditlogController {
  constructor(private readonly authService: AuditlogService) {}

  @Post()
  @Public()
  findAll(@Body() auditlogFilterDto: AuditlogFilterDto) {
    return this.authService.findAll(auditlogFilterDto);
  }

  @Get('queryItems')
  @Public()
  getQueryItems(@Query('q') queryType: string) {
    return this.authService.getQueryItem(queryType);
  }
}
