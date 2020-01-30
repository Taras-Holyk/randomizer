const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');
const ContestType = require('./../types/ContestType');
const ContestsListType = require('./../types/ContestsListType');
const contestRepository = require('./../repositories/ContestRepository');

module.exports = {
  getContestById: {
    type: ContestType,
    description: 'This query will fetch contest by its id',
    args: {
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      return contestRepository.findById(input.contestId).populate('user');
    }
  },
  getContestByPermalink: {
    type: ContestType,
    description: 'This query will fetch contest by its id',
    args: {
      contestPermalink: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      return contestRepository.findByPermalink(input.contestPermalink).populate('user');
    }
  },
  contests: {
    type: ContestsListType,
    description: 'This query will fetch all contests with pagination',
    args: {
      skip: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      first: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      const contests = await contestRepository.getPaginatedContests(input.skip, input.first).populate('user');
      const allContestCount = await contestRepository.getAllContestsCount();

      return {
        total: allContestCount,
        contests: contests || []
      };
    }
  }
};
