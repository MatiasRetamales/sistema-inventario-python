import { Product } from 'app/modules/product/domain/product'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export abstract class ProductRepository {
  abstract create ( product: Product ): Promise<boolean>
  abstract update ( product: Product ): Promise<boolean>
  abstract delete ( id: UUID ): Promise<boolean>
  abstract findAll (): Promise<ProductResponse[]>
  abstract findById ( id: UUID ): Promise<ProductResponse>
}
