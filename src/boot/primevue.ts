import { boot } from 'quasar/wrappers'
import PrimeVue from 'primevue/config'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import IftaLabel from 'primevue/iftalabel'
import Aura from '@primevue/themes/aura'

export default boot( ( { app } ) => {
  app.use( PrimeVue ,{
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: 'light',
      }
    }
  })
  app.component( 'FloatLabel', FloatLabel )
  app.component( 'InputText', InputText )
  app.component( 'Button', Button )
  app.component( 'IftaLabel', IftaLabel )
} )
