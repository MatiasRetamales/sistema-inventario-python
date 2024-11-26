import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidDateException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidDateException'
  }
}
