const default__ = (table) => {
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
module.exports = {
    default__,
    addForgienkey,
    _FcreateTableF,
}