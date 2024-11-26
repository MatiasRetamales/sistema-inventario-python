import { Product } from 'app/modules/product/domain/product'
import { ProductRepository } from 'app/modules/product/domain/product-repository'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export class ProductApiData implements ProductRepository{
  async create( product: Product ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async delete( id: UUID ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async findAll(): Promise<ProductResponse[]> {
    return Promise.resolve( [] )
  }

  async findById( id: UUID ): Promise<ProductResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update( product: Product ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
