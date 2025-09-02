import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { describe } from 'node:test'



describe('transactions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
      }).expect(201)
  });

  it('should be able to list transactions', async () => {
    const responseNewTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
      })

    const cookies = responseNewTransaction.get('Set-Cookie') || []

    const responseTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(responseTransactions.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000
      })
    ]);
  });
})
