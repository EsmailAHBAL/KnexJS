/* eslint-disable semi */
const TABLENAME = require('../../src/constants/tableN')
const knex = require('knex')
const addColumn = (table) => {
    table.timestamps(false, true);
    table.datetime('delete_at');
}
const _FcreateTableF = async(knex, name) => {
    await knex.schema.createTable(name, (table) => {
        table.increments();
        table.string('name').notNullable().unique();
        addColumn(table);

    });
}
const addForgienkey = async(table, fo_col, col, inTable) => {
        table.integer(fo_col).unsigned().references(col).inTable(inTable).onDelete('cascade');
    }
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
exports.up = async(knex) => {
    return await Promise.all([

        knex.schema.createTable(TABLENAME.TB_USER, (table) => {
            table.increments();

            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('name_user').notNullable();
            table.datetime('lst_login');
            addColumn(table);

        }),
        _FcreateTableF(knex, TABLENAME.TB_ITEM_TYPE),
        _FcreateTableF(knex, TABLENAME.COUNTRY),
        _FcreateTableF(knex, TABLENAME.STATE),
        knex.schema.createTable(TABLENAME.LOCATION, (table) => {
            table.increments();
            table.string('name').notNullable();
            table.string('description', 7000);
            addColumn(table);
        }),
        knex.schema.createTable(TABLENAME.SHAPE, table => {
            table.increments().notNullable();
            table.string("name").notNullable();
        }),

        knex.schema.createTable(TABLENAME.ADDRESS, table => {
            table.increments().notNullable();
            table.string('str_addess').notNullable();
            table.string('str2_addess');
            table.string('city').notNullable();
            table.string('zip').notNullable();
            addForgienkey(table, 'state_id', 'id', TABLENAME.STATE);
            addForgienkey(table, 'country_id', 'id', TABLENAME.COUNTRY);

        }),
        knex.schema.createTable(TABLENAME.COMPANY, table => {
            table.increments().notNullable();
            table.string("name").notNullable();
            table.string("logo").notNullable();
            table.string("description").notNullable();
            table.string("email").notNullable();
            addForgienkey(table, "adress_id", "id", TABLENAME.ADDRESS)
        }),
        knex.schema.createTable(TABLENAME.TB_ITEM, table => {
            table.increments();
            table.string("name").notNullable();

        }),

    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {

    await Promise.all([
            TABLENAME.TB_USER,
            TABLENAME.COUNTRY,
            TABLENAME.TB_ITEM_TYPE,
            TABLENAME.STATE,
            TABLENAME.LOCATION,
            TABLENAME.ADDRESS,
            TABLENAME.COMPANY,
        ]
        .map(tablename => {
            knex.schema.dropTable(tablename);
        })
    );
};