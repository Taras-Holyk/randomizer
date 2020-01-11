/**
 * Contest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'contests',
  attributes: {
    user: {
      required: true,
      columnName: 'user_id',
      model: 'user'
    },
    permalink: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true
    },
    name: {
      type: 'string',
      columnType: 'varchar(255)',
      required: true
    },
    startDate: {
      type: 'ref',
      columnType: 'date',
      required: true,
      columnName: 'start_date'
    },
    endDate: {
      type: 'ref',
      columnType: 'date',
      required: true,
      columnName: 'end_date'
    },
    isFinished: {
      type: 'number',
      columnType: 'integer',
      allowNull: true,
      columnName: 'is_finished'
    },
    isActive: {
      type: 'number',
      columnType: 'integer',
      allowNull: true,
      columnName: 'is_active'
    },
    participants: {
      collection: 'user',
      via: 'contest',
      through: 'contestparticipant'
    }
  }
};

