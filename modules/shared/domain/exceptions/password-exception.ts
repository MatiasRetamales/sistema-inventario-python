import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export abstract class InvalidPasswordException extends BaseException {
  constructor()
  {
    super()
    this.name = 'InvalidPasswordException'
  }
}

export class PasswordInsufficientLowercaseException
  extends InvalidPasswordException {
  constructor() {
    super()
    this.name = 'PasswordInsufficientLowercaseException'
  }
}

export class PasswordInsufficientUppercaseException
  extends InvalidPasswordException {
  constructor() {
    super()
    this.name = 'PasswordInsufficientUppercaseException'
  }
}

export class PasswordInsufficientNumberException
  extends InvalidPasswordException {
  constructor() {
    super()
    this.name = 'PasswordInsufficientUppercaseException'
  }
}

export class PasswordInsufficientCharacterException
  extends InvalidPasswordException {
  constructor() {
    super()
    this.name = 'PasswordInsufficientCharacterException'
  }
}

export class PasswordInsufficientLengthException
  extends InvalidPasswordException {
  constructor() {
    super()
    this.name = 'PasswordInsufficientCharacterException'
  }
}
