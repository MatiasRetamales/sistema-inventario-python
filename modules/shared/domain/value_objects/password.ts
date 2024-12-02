import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'
import {
  PasswordInsufficientCharacterException,
  PasswordInsufficientLengthException,
  PasswordInsufficientLowercaseException,
  PasswordInsufficientNumberException,
  PasswordInsufficientUppercaseException
} from 'app/modules/shared/domain/exceptions/password-exception'
import { z } from 'zod'

export class Password {
  readonly value: string

  private constructor( value: string ) {
    this.value = value
  }

  /**
   * Create a Password instance
   * @throws {PasswordInsufficientLengthException} - if password length is invalid
   * @throws {PasswordInsufficientUppercaseException} - if password uppercase is invalid
   * @throws {PasswordInsufficientLowercaseException} - if password lowercase is invalid
   * @throws {PasswordInsufficientNumberException} - if password number is invalid
   * @throws {PasswordInsufficientCharacterException} - if password character is invalid
   */
  static from( value: string ): Password {
    const parseValue = z.string()
                        .min( 8 )
                        .regex( RegExp( /^(?=.*[a-z]).*$/ ),
                          { message: 'lowercase' } )
                        .regex( RegExp( /^(?=.*[A-Z]).*$/ ),
                          { message: 'uppercase' } )
                        .regex( RegExp( /^(?=.*\d).*$/ ),
                          { message: 'number' } )
                        .regex( RegExp( /^(?=.*[$@!?&]).*$/ ),
                          { message: 'character' } )
                        .safeParse( value )

    if ( parseValue.success === false ) {
      const errors: BaseException[] = []
      for ( let e of parseValue.error.errors ) {

        if ( e.message === 'lowercase' ) {
          errors.push( new PasswordInsufficientLowercaseException() )
        }
        else if ( e.message === 'uppercase' ) {
          errors.push( new PasswordInsufficientUppercaseException() )
        }
        else if ( e.message === 'number' ) {
          errors.push( new PasswordInsufficientNumberException() )
        }
        else if ( e.message === 'character' ) {
          errors.push( new PasswordInsufficientCharacterException() )
        }
        else {
          errors.push( new PasswordInsufficientLengthException() )
        }
      }
      if ( errors.length > 0 ) {
        throw errors
      }
    }

    return new Password( value )
  }
}

