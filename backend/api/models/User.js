const bcrypt = require('bcrypt');

/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true
    },
    contests: {
      collection: 'contest',
      via: 'user'
    },
    participatesInContests: {
      collection: 'contest',
      via: 'participant',
      through: 'contestparticipant'
    }
  },
  beforeCreate: function(user, cb){
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return cb(err);
      }

      user.password = hash;

      return cb();
    });
  }
};

