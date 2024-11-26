import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export class Provider{
  constructor(
    readonly id: UUID,
    readonly name: ValidString,
  ){}
}
