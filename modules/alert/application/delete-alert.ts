import { AlertRepository } from 'app/modules/alert/domain/alert-repository'
import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function deleteAlert( repo: AlertRepository,
  currentId: string ): Promise<boolean | Errors> {
  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( currentId ) )

  if ( id instanceof InvalidUUIDException ) {
    return new Errors( [ id ] )
  }

  return await wrapTypeErrors( async () => await repo.delete(
    id as UUID
  ) )
}
