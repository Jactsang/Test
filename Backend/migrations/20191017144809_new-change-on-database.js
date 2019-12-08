exports.up = function(knex, Promise) {
    return knex.schema
      .createTable("application", function(table) {
        table
          .increments("id")
          .unsigned()
          .primary();
        table.string("first_name");
        table.string("last_name");
        table.string("email").unique();
        table.string("education_certificate",1000);
        table.string("instrument_1");
        table.integer("level_of_skil_1");
        table.string("instrument_2");
        table.integer("level_of_skil_2");
        table.string("instrument_3");
        table.integer("level_of_skil_3");
        table.string("summary",1000);
        table.string("referral");
        table.string("language_English");
        table.string("language_Mandarin");
        table.string("language_Cantonese");
        table.string("experience",1000);
        table.string("upload_1");
        table.string("upload_2");
        table.string("upload_3");
        table.integer('account_id').unsigned();
        table.timestamps(false, true);
      });
  };

exports.down = function(knex, Promise) {
    return knex.schema
            .dropTable("application")
};
  