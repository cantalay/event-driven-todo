import { Module } from '@nestjs/common';
import { AuditlogService } from './services/auditlog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditlog } from './entities/auditlog.entity';
import { AuditlogController } from './auditlog.controller';
import { HttpModule } from '@nestjs/axios';
import { PublisherService } from './services/publisher.service';
import { SubscriberModule } from '../subscriber/subscriber.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auditlog]),
    SubscriberModule,
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
  ],
  providers: [AuditlogService, PublisherService],
  exports: [AuditlogService, PublisherService],
  controllers: [AuditlogController],
})
export class AuditlogModule {}
