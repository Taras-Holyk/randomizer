module.exports = {
  friendlyName: 'Check if user is authorized',

  description: 'Check whether or not user is authorized for further actions',

  inputs: {
    user: {
      type: 'ref',
      description: 'Authorized user',
      required: true
    }
  },

  exits: {
    success: {
      description: 'User is authorized',
    },
  },

  fn: async function (inputs, exits) {
    if (inputs.user && Object.keys(inputs.user).length) {
      return exits.success();
    }

    throw new Error('User is unauthorized');
  }


};

