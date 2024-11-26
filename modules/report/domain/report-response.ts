import { ReportType } from 'app/modules/report/domain/report-type'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'

export interface ReportResponse {
  id: UUID,
  type: ReportType,
  createdAt: ValidDate,
  startDate: ValidDate,
  endDate: ValidDate,
}
