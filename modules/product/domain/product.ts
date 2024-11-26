import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export class Product{
  constructor(
    readonly id: UUID,
    readonly name: ValidString,
    readonly quantity: ValidInteger,
    readonly price: ValidInteger,
    readonly categoryID: UUID,
    readonly providerID: UUID,
  ){}
}
