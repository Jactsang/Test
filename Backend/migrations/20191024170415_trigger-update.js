const ON_UPDATE_TIMESTAMP_FUNCTION = `
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = `DROP FUNCTION trigger_set_timestamp()`;

exports.up = function(knex) {
  return knex
        .raw(ON_UPDATE_TIMESTAMP_FUNCTION)
};

exports.down = function(knex) {
 return knex
        .raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION)
};