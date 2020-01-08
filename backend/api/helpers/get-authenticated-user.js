const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Fetch user info',

  description: 'Fetch user info from auth token',

  inputs: {
    headers: {
      type: 'ref',
      required: true,
      description: ''
    }
  },

  exits: {
    success: {
      description: 'Token is valid',
    }
  },

  fn: async function (inputs, exits) {
    let user = {};
    let token = inputs.headers['x-access-token'] || inputs.headers['authorization'] || '';

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    if (token) {
      user = jwt.verify(token, sails.config.custom.appKey);
    }

    return exits.success(user);
  }
};

