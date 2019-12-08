const CONNECT_FUNCTION_TO_TABLE_VIDEO = `
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON video
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
`

const DISCONNECT_FUNCTION_AND_TABLE_VIDEO = `DROP TRIGGER set_timestamp ON video`

exports.up = function(knex) {
    return knex
            .raw(CONNECT_FUNCTION_TO_TABLE_VIDEO)
};

exports.down = function(knex) {
    return knex
            .raw(DISCONNECT_FUNCTION_AND_TABLE_VIDEO)
  
};