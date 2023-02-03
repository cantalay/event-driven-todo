import { Auditlog } from '../entities/auditlog.entity';

export interface QueryItemDto {
  userNames: string[];
  todoIds: string[];
  actions: string[];
  types: string[];
}
