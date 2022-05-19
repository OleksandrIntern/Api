const knex = require('knex')({
    client :'pg',
    connection:{
        host:"localhost",
        user: "alex",
        password: "nan",
        database:"tasks"
    }
})
module.exports = knex