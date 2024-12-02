import { Product } from 'app/modules/product/domain/product'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export abstract class ProductRepository {
  abstract create ( product: Product ): Promise<boolean>
  abstract update ( product: Product ): Promise<boolean>
  abstract delete ( id: ValidInteger ): Promise<boolean>
  abstract findAll (): Promise<ProductResponse[]>
  abstract findById ( id: ValidInteger ): Promise<ProductResponse>
}
