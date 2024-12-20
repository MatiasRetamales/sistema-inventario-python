import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export class Category{
  constructor(
    readonly name: ValidString,
    readonly id ?: ValidInteger,
  ){}
}
