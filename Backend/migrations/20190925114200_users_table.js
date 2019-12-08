exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("account", function(table) {
      table
        .increments("id")
        .unsigned()
        .primary();
      table.string("email").unique();
      table.string("password");
      table.string("first_name");
      table.string("last_name");
      table.boolean("student");
      table.boolean("expert");
      table.boolean("admin");
      table.boolean("pending");
      table.boolean("subscribed");
      table.integer("quota_increased");
      table.timestamp("subscribed_at");
      table.timestamp("expiry_date");
      table.timestamps(false, true);
    })
    .createTable("video", function(table) {
      table
        .increments("id")
        .unsigned()
        .primary();
      table.string("video_link");
      table.integer("student_id");
      table.integer("expert_id");
      table.string("song_name");
      table.string("composer");
      table.string("instrument");
      table.integer("grade");
      table.timestamps(false, true);
      table.string("music_score_url");
      table.string("thumbnail_url");
      table.integer("rating");
      table.decimal("video_time_duration");
    })
    .createTable("video_comment", function(table) {
      table
        .increments("id")
        .unsigned()
        .primary();
      table.integer("video_id");
      table.string("comment_timecode");
      table.integer("account_id");
      table.string("video_link");
      table.string("comment");
      table.string("comment_aspect");
      table.boolean("comment_type");
      table.timestamps(false, true);
    })
};
exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("account")
    .dropTable("video")
    .dropTable("video_comment")
};
