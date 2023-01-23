import { createEventSchema } from '@/application/validation/schemas/create-event-schema'
import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'
import { makeCreateEventController } from '@/main/factories/application/controllers/create-event-factory'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/event', adapt(makeCreateEventController(), createEventSchema))
}
