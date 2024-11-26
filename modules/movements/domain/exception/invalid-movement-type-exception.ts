import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidMovementTypeException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidMovementTypeException'
  }
}
