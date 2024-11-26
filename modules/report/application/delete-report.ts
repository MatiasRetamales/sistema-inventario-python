import { ReportRepository } from 'app/modules/report/domain/report-repository'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function deleteReport( repo: ReportRepository,
  currentId: string ): Promise<boolean | Errors> {
  const id = wrapType<UUID, InvalidUUIDException>(
    () => UUID.from( currentId ) )

  if ( id instanceof BaseException ) {
    return new Errors( [ id ] )
  }

  return await wrapTypeErrors( async () => await repo.delete( id as UUID ) )
}
