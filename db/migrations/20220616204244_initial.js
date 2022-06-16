const { _FcreateTableF, default__, addForgienkey } = require("../../src/constants/default");
const tablename = require("../../src/constants/tableN");


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await Promise.all([
        knex.schema.createTable(tablename.TB_ITEM, table => {
            // id user  item_type_id   company_id  size_id  
            table.increments();
            table.string("description").notNullable();
            table.string("name").notNullable();
            addForgienkey(table, 'id_user', 'id', tablename.TB_USER);
            addForgienkey(table, 'item_type_id', 'id', tablename.TB_ITEM_TYPE);
            addForgienkey(table, 'copany_id', 'id', tablename.COMPANY);
            addForgienkey(table, 'size_id', 'id', tablename.SIZE);
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable(tablename.TB_ITEM);
};