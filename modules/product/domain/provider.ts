import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export class Provider{
  constructor(
    readonly name: ValidString,
    readonly contact: ValidString,
    readonly phone: ValidString,
    readonly email: ValidString,
    readonly address: ValidString[],
    readonly id ?: ValidInteger,
  ){}
}
