import { ProductRepository } from 'app/modules/product/domain/product-repository'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { wrapTypeErrors } from 'app/modules/shared/utils/wrap-type'

export async function findAllProducts(repo : ProductRepository): Promise<ProductResponse[] | Errors> {
  return wrapTypeErrors( async () => await repo.findAll())
}
