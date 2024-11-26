import { InvalidMovementTypeException } from 'app/modules/movements/domain/exception/invalid-movement-type-exception'
import { z } from 'zod'

export enum MovementTypeEnum {
  Entrada,
  Salida,
}

export class MovementType {

  readonly value: MovementTypeEnum

  constructor( value: MovementTypeEnum ) {
    this.value = value
  }

  static from( value: string ): MovementType {
    const result = z.nativeEnum( MovementTypeEnum )
                    .safeParse( value )
    if ( result.success === false ) {
      throw new InvalidMovementTypeException()
    }
    return new MovementType( result.data )
  }
}


