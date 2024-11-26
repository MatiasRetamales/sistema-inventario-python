import { ReportType } from 'app/modules/report/domain/report-type'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'

export class Report {
  constructor(
    readonly id: UUID,
    readonly type: ReportType,
    readonly createdAt: ValidDate,
    readonly startDate: ValidDate,
    readonly endDate: ValidDate,
  )
  {}
}
