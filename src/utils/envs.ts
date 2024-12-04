// import 'dotenv/config'
// import { z } from 'zod'
//
// const envsSchema = z.object( {
//   PORT        : z.number()
// } )
//                     .strict()
//
// type EnvsType = z.infer<typeof envsSchema>
// export interface Envs extends EnvsType {}
//
// const envVars = envsSchema.safeParse( {
//   ...process.env,
// } )
//
// if ( !envVars.success ) {
//   throw new Error( `Config validation error: ${ envVars.error.message }` )
// }
//
//
// const { PORT } = envVars.data
//
// export const envs = {
//   port       : PORT,
// }
