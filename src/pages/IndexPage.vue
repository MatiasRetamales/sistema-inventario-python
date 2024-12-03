<script setup
  lang="ts">
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidPasswordException } from 'app/modules/shared/domain/exceptions/password-exception'
import { Password } from 'app/modules/shared/domain/value_objects/password'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

// import { createProduct } from 'app/modules/product/application/create-product'
// import { findAllProducts } from 'app/modules/product/application/find-all-products'
// import { Category } from 'app/modules/product/domain/category'
// import { ProductRepository } from 'app/modules/product/domain/product-repository'
// import { Provider } from 'app/modules/product/domain/provider'
// import { ProductMemoryData } from 'app/modules/product/infrastructure/product-memory-data'
// import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
// import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
// import { onMounted } from 'vue'
// import { v4 as uuidv4 } from 'uuid'
// onMounted(async () => {
//   console.log('mounted')
//   const uuidC1 = UUID.from(uuidv4())
//   const uuidC2 = UUID.from(uuidv4())
//   const categories = new Map<string, Category>([
//     [uuidC1.value, new Category(uuidC1, ValidString.from('cat1'))],
//     [uuidC2.value, new Category(uuidC2, ValidString.from('cat2'))],
//   ])
//   const uuidP1 = UUID.from(uuidv4())
//   const uuidP2 = UUID.from(uuidv4())
//   const providers = new Map<string, Provider>([
//     [uuidP1.value, new Provider(uuidP1, ValidString.from('prov1'))],
//     [uuidP2.value, new Provider(uuidP2, ValidString.from('prov2'))],
//   ])
//   const r : ProductRepository = new ProductMemoryData(categories,providers,[])
//
//   const save1 = await createProduct(r,{
//     name: 'product1',
//     quantity: 10,
//     price: 100,
//     categoryID: uuidC1.value,
//     providerID: uuidP1.value
//   })
//   console.log('save1:',save1)
//
//   const products = await findAllProducts(r)
//   console.log('products:',products)
// })
import {
  ref
} from 'vue'
const value = ref( '' )
</script>

<template>
  <q-page>
    <div class="flex flex-col h-full items-center">
      <span>tailwind works</span>
      <Button label="Submit"/>
      <IftaLabel>
        <InputText id="username" v-model="value" />
        <label for="username">Username</label>
      </IftaLabel>
    </div>
  </q-page>
</template>

<style scoped>
</style>

