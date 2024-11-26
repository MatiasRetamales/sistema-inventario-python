import { Report } from 'app/modules/report/domain/report'
import { ReportResponse } from 'app/modules/report/domain/report-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export abstract class ReportRepository {

  abstract create( alert: Report ): Promise<boolean>

  abstract update( alert: Report ): Promise<boolean>

  abstract delete( id: UUID ): Promise<boolean>

  abstract findAll(): Promise<ReportResponse[]>

  abstract findById( id: UUID ): Promise<ReportResponse>
}
