import knex from 'knex'

export const db = knex({
    client: "mysql",
    connection: {
        host: '',
        password: '',
        port: 3306,
        user: '',
        database: 'gbsw-todo'
    }
})