import { ReportRepository } from 'app/modules/report/domain/report-repository'
import { ReportResponse } from 'app/modules/report/domain/report-response'
import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { wrapTypeErrors } from 'app/modules/shared/utils/wrap-type'

export async function findAllReports(repo : ReportRepository): Promise<ReportResponse[] | Errors> {
  return wrapTypeErrors( async () => await repo.findAll())
}
