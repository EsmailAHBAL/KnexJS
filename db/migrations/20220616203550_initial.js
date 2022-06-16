const { _FcreateTableF, default__, addForgienkey } = require("../../src/constants/default");
const tablename = require("../../src/constants/tableN");


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await Promise.all([

        knex.schema.createTable(tablename.SIZE, table => {
            table.increments().notNullable();
            table.float('height');
            table.float('width');
            table.float('lenght');
            table.float('voulume');
            default__(table);
            addForgienkey(table, 'shape_id', 'id', tablename.SHAPE);

        }),
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable(tablename.SIZE)
};