import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
  RequestMethod,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuditlogService } from './services/auditlog.service';
import { tap } from 'rxjs/operators';
import { ActionTypeEnum } from '../common/enums/action-type.enum';
import { AuditlogTypeEnum } from './enums/auditlog-type.enum';
import { PublisherService } from './services/publisher.service';

export function AuditLogInterceptor(action: ActionTypeEnum): any {
  class AuditLogMixin implements NestInterceptor {
    constructor(
      @Inject(AuditlogService)
      private readonly auditlogService: AuditlogService,
      @Inject(PublisherService)
      private readonly publisherService: PublisherService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        tap(async (response) => {
          const req = context.switchToHttp().getRequest();
          const method: string = req.method;
          const userInfo = req.user || req.body;
          const executionDate: Date =
            RequestMethod[method] === RequestMethod.POST
              ? response.createdAt
              : response.updatedAt;

          const todoId: string = action.includes('TODO')
            ? response._id.toString()
            : null;

          this.auditlogService.createAuditLog(
            action,
            AuditlogTypeEnum.COMMAND,
            executionDate,
            userInfo,
            todoId ? todoId.toString() : null,
          );
          const isPublish: boolean = await this.publisherService.publishEvent(
            action,
            userInfo,
            todoId ? todoId.toString() : null,
            executionDate,
          );
          if (isPublish) {
            this.auditlogService.createAuditLog(
              action,
              AuditlogTypeEnum.EVENT,
              executionDate,
              userInfo,
              todoId ? todoId.toString() : null,
            );
          }
        }),
      );
    }
  }

  return mixin(AuditLogMixin);
}
