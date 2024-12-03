import { Category } from 'app/modules/product/domain/category'
import { Product } from 'app/modules/product/domain/product'
import { ProductRepository } from 'app/modules/product/domain/product-repository'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { Provider } from 'app/modules/product/domain/provider'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export class ProductMemoryData implements ProductRepository {

  private readonly products: Map<string, Product> = new Map()

  constructor(
    private readonly categories: Map<string, Category>,
    private readonly providers: Map<string, Provider>,
    products: Product[]
  )
  {
    products.forEach(
      product => this.products.set( product.id.value, product ) )
  }

  async create( product: Product ): Promise<boolean> {
    const category = this.categories.get( product.categoryID.value )
    const provider = this.providers.get( product.providerID.value )
    if ( !category || !provider ) {
      return false
    }
    this.products.set( product.id.value, product )
    return true
  }

  async delete( id: UUID ): Promise<boolean> {
    return this.products.delete( id.value )
  }

  async findAll(): Promise<ProductResponse[]> {
    return Array.from( this.products.values() )
                .map( product => {
                  const category = this.categories.get(
                    product.categoryID.value )
                  const provider = this.providers.get(
                    product.providerID.value )
                  if ( !category || !provider ) {
                    throw new Error( 'Category or provider not found' )
                  }
                  return {
                    id      : product.id,
                    label   : product.name,
                    quantity: product.quantity,
                    price   : product.price,
                    category: category,
                    provider: provider
                  }
                } )
  }

  async findById( id: UUID ): Promise<ProductResponse> {
    const product = this.products.get( id.value )
    if ( !product ) {
      throw new Error( 'Product not found' )
    }
    const category = this.categories.get( product.categoryID.value )

    const provider = this.providers.get( product.providerID.value )

    if ( !category || !provider ) {
      throw new Error( 'Category or provider not found' )
    }

    return {
      id      : product.id,
      label   : product.name,
      quantity: product.quantity,
      price   : product.price,
      category: category,
      provider: provider
    }
  }

  async update( product: Product ): Promise<boolean> {

    const category = this.categories.get( product.categoryID.value )

    const provider = this.providers.get( product.providerID.value )

    if ( !category || !provider ) {
      return false
    }

    this.products.set( product.id.value, product )

    return true
  }
}
