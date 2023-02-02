import { Injectable, RequestMethod } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Auditlog } from '../entities/auditlog.entity';
import { AuditlogDto } from '../dto/auditlog.dto';
import { AuditlogTypeEnum } from '../enums/auditlog-type.enum';
import { AuditlogFilterDto } from '../dto/auditlog-filter.dto';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { AuditResponseDto } from '../dto/audit-response.dto';

@Injectable()
export class AuditlogService {
  constructor(
    @InjectRepository(Auditlog)
    private auditlogRepository: MongoRepository<Auditlog>,
  ) {}

  createAuditLog(
    action: ActionTypeEnum,
    type: AuditlogTypeEnum,
    executionDate: Date,
    userInfo,
    todoId,
  ) {
    const auditlogDto: AuditlogDto = new AuditlogDto();

    auditlogDto.action = action;
    auditlogDto.type = type;
    auditlogDto.executionTime = executionDate;
    auditlogDto.userName = userInfo.userName;
    auditlogDto.todoId = todoId;

    const auditlog = this.auditlogRepository.create(auditlogDto);
    return this.auditlogRepository.save(auditlog);
  }

  async findAll(auditlogFilterDto: AuditlogFilterDto) {
    const auditFilter = {
      where: {
        $and: [],
      },
      take: 10,
      skip: 0,
    };
    if (auditlogFilterDto.users && auditlogFilterDto.users.length > 0) {
      auditFilter.where.$and.push({
        userName: { $in: [...auditlogFilterDto.users] },
      });
    }
    if (auditlogFilterDto.actions && auditlogFilterDto.actions.length > 0) {
      auditFilter.where.$and.push({
        action: { $in: [...auditlogFilterDto.actions] },
      });
    }
    if (auditlogFilterDto.type) {
      auditFilter.where.$and.push({ type: auditlogFilterDto.type });
    }
    if (auditlogFilterDto.todoId) {
      auditFilter.where.$and.push({
        todoId: auditlogFilterDto.todoId,
      });
    }
    if (!auditFilter.where.$and.length) {
      delete auditFilter.where;
    }
    if (auditlogFilterDto.pagination) {
      if (
        auditlogFilterDto.pagination.page &&
        auditlogFilterDto.pagination.pageSize
      ) {
        auditFilter.take = auditlogFilterDto.pagination.pageSize;
        auditFilter.skip =
          (auditlogFilterDto.pagination.page - 1) *
          auditlogFilterDto.pagination.pageSize;
      }
    }

    const [result, count] = await this.auditlogRepository.findAndCount(
      auditFilter,
    );
    const auditResponseDto: AuditResponseDto = {
      data: result,
      count: count,
    };
    return auditResponseDto;
  }
}
