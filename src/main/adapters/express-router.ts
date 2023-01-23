import { Controller } from '@/application/controllers/controller'

import { RequestHandler } from 'express'
import { ZodSchema } from 'zod'

type Adapter = (controller: Controller, schema: ZodSchema) => RequestHandler

export const adaptExpressRoute: Adapter = (controller, schema) => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals, ...req.query }, schema)
  const json = [200, 201, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
