import { Movement } from 'app/modules/movements/domain/movement'
import { MovementDetail } from 'app/modules/movements/domain/movement-detail'
import { MovementRepository } from 'app/modules/movements/domain/movement-repository'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export class MovementApiData implements  MovementRepository{
  async create(  movement: Movement, detail : MovementDetail  ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async delete( id: ValidInteger ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async findAll(): Promise<MovementResponse[]> {
    return Promise.resolve( [] )
  }

  async findById( id: ValidInteger ): Promise<MovementResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update(  movement: Movement, detail : MovementDetail  ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
