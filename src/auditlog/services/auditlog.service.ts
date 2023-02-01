import { Injectable, RequestMethod } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Auditlog } from '../entities/auditlog.entity';
import { AuditlogDto } from '../dto/auditlog.dto';
import { AuditlogTypeEnum } from '../enums/auditlog-type.enum';
import { AuditlogFilterDto } from '../dto/auditlog-filter.dto';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';

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

  findAll(auditlogFilterDto: AuditlogFilterDto) {
    const auditFilter = {
      where: {
        $and: [],
      },
    };
    if (auditlogFilterDto.users.length) {
      auditFilter.where.$and.push({
        userName: { $in: [...auditlogFilterDto.users] },
      });
    }
    if (auditlogFilterDto.actions.length) {
      auditFilter.where.$and.push({
        action: { $in: [...auditlogFilterDto.actions] },
      });
    }
    if (auditlogFilterDto.type.length) {
      auditFilter.where.$and.push({ type: auditlogFilterDto.type });
    }
    if (auditlogFilterDto.todoId) {
      auditFilter.where.$and.push({
        todoId: auditlogFilterDto.todoId,
      });
    }
    if (!auditFilter.where.$and.length) {
      return this.auditlogRepository.find();
    }
    return this.auditlogRepository.find(auditFilter);
  }
}
