import { AlertRepository } from 'app/modules/alert/domain/alert-repository'
import { AlertResponse } from 'app/modules/alert/domain/alert-response'
import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { wrapTypeErrors } from 'app/modules/shared/utils/wrap-type'

export async function findAllAlerts(repo : AlertRepository): Promise<AlertResponse[] | Errors> {
  return wrapTypeErrors( async () => await repo.findAll())
}
