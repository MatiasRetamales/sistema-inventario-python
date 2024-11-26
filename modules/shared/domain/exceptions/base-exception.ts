export abstract class BaseException extends Error {
  protected constructor() {
    super(  )
    this.name = 'BaseException'
  }
}

export class Errors {
  constructor( readonly values: BaseException[] ) {}
}
