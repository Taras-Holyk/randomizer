const UserType = require('./../types/UserType');
const userRepository = require('./../repositories/UserRepository');

module.exports = {
  getCurrentUser: {
    type: UserType,
    description: 'This query will fetch authorized user',
    args: {},
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      return userRepository.findById(context.user.id);
    }
  }
};
