import { Movement } from 'app/modules/movements/domain/movement'
import { MovementDetail } from 'app/modules/movements/domain/movement-detail'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export abstract class MovementRepository {

  abstract create( movement: Movement, detail : MovementDetail ): Promise<boolean>

  abstract update( movement: Movement, detail : MovementDetail ): Promise<boolean>

  abstract delete( id: ValidInteger ): Promise<boolean>

  abstract findAll(): Promise<MovementResponse[]>

  abstract findById( id: ValidInteger ): Promise<MovementResponse>
}
