import { Movement } from 'app/modules/movements/domain/movement'
import { MovementRepository } from 'app/modules/movements/domain/movement-repository'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export class MovementApiData implements  MovementRepository{
  async create( movement: Movement ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async delete( id: UUID ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async findAll(): Promise<MovementResponse[]> {
    return Promise.resolve( [] )
  }

  async findById( id: UUID ): Promise<MovementResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update( movement: Movement ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
