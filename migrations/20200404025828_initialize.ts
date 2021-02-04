import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema
    .withSchema(process.env.ENVIRONMENT || 'public')
    .createTable('transactions', table => {
      table.string('id', 64).notNullable();
      table.text('owner');
      table.jsonb('tags');
      table.string('target', 64);
      table.string('quantity');
      table.string('reward');
      table.text('signature');
      table.string('last_tx', 64);
      table.integer('data_size', 8);
      table.string('content_type');
      table.integer('format', 2);
      table.integer('height', 4);
      table.string('owner_address');
      table.string('data_root', 64);
      table.string('parent', 64);

      table.primary(['id'], 'pkey_transactions');
    })
    .createTable('blocks', table => {
      table.string('id', 64).notNullable();
      table.integer('height', 4).notNullable();
      table.timestamp('mined_at').notNullable();
      table.jsonb('txs').notNullable();
      table.string('previous_block').notNullable();
      table.jsonb('extended');

      table.primary(['id'], 'pkey_blocks');
    })
    .createTable('tags', table => {
      table.string("tx_id", 64).notNullable();
      table.integer("index").notNullable();
      table.string("name").notNullable();
      table.text("value").notNullable();

      table.primary(["tx_id", "index"], "pkey_tags");
      table.index(["name", "value"], "index_name_value", "BTREE");
    });
}

export async function down(knex: Knex){
  return knex.schema
    .withSchema(process.env.ENVIRONMENT || 'public')
    .dropTableIfExists('transactions')
    .dropTableIfExists('blocks')
    .dropTableIfExists('tags');
}