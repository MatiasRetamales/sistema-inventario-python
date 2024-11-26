import { Movement } from 'app/modules/movements/domain/movement'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export abstract class MovementRepository {

  abstract create( movement: Movement ): Promise<boolean>

  abstract update( movement: Movement ): Promise<boolean>

  abstract delete( id: UUID ): Promise<boolean>

  abstract findAll(): Promise<MovementResponse[]>

  abstract findById( id: UUID ): Promise<MovementResponse>
}
