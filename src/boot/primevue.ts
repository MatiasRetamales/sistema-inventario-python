import { boot } from 'quasar/wrappers'
import PrimeVue from 'primevue/config'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Drawer from 'primevue/drawer';
import Button from 'primevue/button'
import Message from 'primevue/message';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import 'primeicons/primeicons.css'
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
  app.component( 'Message', Message )
  app.component( 'Drawer', Drawer )
  app.component( 'DataTable', DataTable )
  app.component( 'Column', Column )
  app.component( 'ColumnGroup', ColumnGroup )
  app.component( 'Row', Row )
} )
