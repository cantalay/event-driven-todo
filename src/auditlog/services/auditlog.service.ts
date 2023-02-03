import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { Auditlog } from '../entities/auditlog.entity';
import { AuditlogDto } from '../dto/auditlog.dto';
import { AuditlogTypeEnum } from '../enums/auditlog-type.enum';
import { AuditlogFilterDto } from '../dto/auditlog-filter.dto';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { AuditResponseDto } from '../dto/audit-response.dto';
import { QueryItemDto } from '../dto/query-item.dto';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { ReadPreference } from 'typeorm/driver/mongodb/typings';
import { ObjectId } from 'mongodb';

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
  async getQueryItem(queryType: string): Promise<string[]> {
    switch (queryType) {
      case 'userName':
        return await this.auditlogRepository.distinct('userName', {
          where: { userName: 'alicant' },
        });
      case 'todoId':
        return await this.auditlogRepository.distinct('todoId', {});
      case 'action':
        return await this.auditlogRepository.distinct('action', {});
      case 'type':
        return await this.auditlogRepository.distinct('type', {});
      default:
        return [];
    }
  }

  async findAll(auditlogFilterDto: AuditlogFilterDto) {
    const auditFilter = {
      where: {
        $and: [],
      },
      take: 10,
      skip: 0,
    };
    if (auditlogFilterDto.userName && auditlogFilterDto.userName.length > 0) {
      auditFilter.where.$and.push({
        userName: { $regex: auditlogFilterDto.userName },
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
        todoId: { $regex: auditlogFilterDto.todoId },
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
