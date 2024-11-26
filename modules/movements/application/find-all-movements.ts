import { MovementRepository } from 'app/modules/movements/domain/movement-repository'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { wrapTypeErrors } from 'app/modules/shared/utils/wrap-type'

export async function findAllMovements(repo : MovementRepository): Promise<MovementResponse[] | Errors> {
  return wrapTypeErrors( async () => await repo.findAll())
}
