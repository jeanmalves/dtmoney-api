import { knex as setupKnex } from 'knex'

export const Knex = setupKnex({
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
})
