import { Body, Controller, Post } from '@nestjs/common';
import { AuditlogService } from './services/auditlog.service';
import { AuditlogFilterDto } from './dto/auditlog-filter.dto';

@Controller('auditlog')
export class AuditlogController {
  constructor(private readonly authService: AuditlogService) {}

  @Post()
  findAll(@Body() auditlogFilterDto: AuditlogFilterDto) {
    return this.authService.findAll(auditlogFilterDto);
  }
}
