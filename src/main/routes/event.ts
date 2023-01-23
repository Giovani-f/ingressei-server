import { createEventSchema } from '@/application/validation/schemas/create-event-schema'
import { searchEventSchema } from '@/application/validation/schemas/search-event-schema'
import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'
import { makeCreateEventController } from '@/main/factories/application/controllers/create-event-factory'
import { makeSearchEventController } from '@/main/factories/application/controllers/search-event-factory'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/event', adapt(makeCreateEventController(), createEventSchema))
  router.get('/event', adapt(makeSearchEventController(), searchEventSchema))
}
