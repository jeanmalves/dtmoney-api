import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import z from 'zod'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (reuest, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      type: z.enum(['credit', 'debit']),
      amount: z.number(),
    })

    const { title, type, amount } = createTransactionBodySchema.parse(
      reuest.body,
    )

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
