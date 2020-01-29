/**
 * Contest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'prizes',
  attributes: {
    contest: {
      required: true,
      columnName: 'contest_id',
      model: 'contest'
    },
    name: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true
    },
    place: {
      type: 'number',
      columnType: 'integer',
      allowNull: true,
      columnName: 'place'
    }
  }
};

