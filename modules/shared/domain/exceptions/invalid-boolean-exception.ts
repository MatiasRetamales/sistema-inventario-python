import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidBooleanException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidBooleanException'
  }
}
