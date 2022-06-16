const bcrypt = require('bcrypt')
const crypto = require('crypto')
const TableByOrder = require('../src/constants/byOrder.js')
const Tables = require('../src/constants/tableN')
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> } 
     */
exports.seed = async function(knex) {

    await TableByOrder.reduce(async(promise, table) => {
            console.log(table);
            await promise;
            console.log("Clearing Table " + table);
            return knex(table).del();

        },
        Promise.resolve());


    // await knex(Tables.TB_USER).insert({
    //     email: "EMail",
    //     password: "HEu",
    //     name_user: 'JDJJD',
    // })


    const passRandom = crypto.randomBytes(30).toString('hex')

    const user = {
        email: 'test@gmail.com',
        name_user: 'test',
        password: await bcrypt.hash(passRandom, 12)
    }

    const [userResult] = await knex(Tables.TB_USER).insert(user).returning('*')
    await knex(Tables.COUNTRY).insert([{
            name: "US",
        },
        {
            name: "MAROC",
        },
        {
            name: "CANADA",
        }
    ])

    console.log('User Created  😘', {
            passRandom
        },
        userResult)

};