/**
 * ContestParticipant.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'contest_participants',
  attributes: {
    contest: {
      required: true,
      columnName: 'contest_id',
      model: 'contest'
    },
    participant: {
      required: true,
      columnName: 'user_id',
      model: 'user'
    }
  }
};

