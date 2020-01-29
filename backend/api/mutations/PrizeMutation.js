const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const PrizeType = require('./../types/PrizeType');
const ContestType = require('./../types/ContestType');
const prizeRepository = require('./../repositories/PrizeRepository');
const contestRepository = require('./../repositories/ContestRepository');

module.exports = {
  addPrizeToContest: {
    type: PrizeType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      place: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      },
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      const contest = await contestRepository.findById(input.contestId).populate('user');
      if (!contest) {
        throw new Error(`Contest with id ${input.contestId} does not exist`);
      }

      if (contest.user.id !== context.user.id) {
        throw new Error('You do not have permission to add prizes to this contest');
      }

      return prizeRepository.addPrize({
        name: input.name,
        contest: input.contestId,
        place: input.place
      });
    }
  },
  updatePrize: {
    type: PrizeType,
    args: {
      prizeId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      place: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      const prize = await prizeRepository.findById(input.prizeId).populate('contest');
      if (!prize) {
        throw new Error(`Prize with id ${input.prizeId} does not exist`);
      }

      if (!Object.keys(prize.contest).length) {
        throw new Error(`Contest with id ${prize.contest.id} does not exist`);
      }

      if (prize.contest.user !== context.user.id) {
        throw new Error('You do not have permission to edit this prize');
      }

      const prizeData = {
        name: input.name,
        place: input.place
      };

      return prizeRepository.updatePrize(prize.id, prizeData);
    }
  },
  deletePrize: {
    type: ContestType,
    args: {
      prizeId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      const prize = await prizeRepository.findById(input.prizeId).populate('contest');
      if (!prize) {
        throw new Error(`Prize with id ${input.prizeId} does not exist`);
      }

      if (!Object.keys(prize.contest).length) {
        throw new Error(`Contest with id ${prize.contest.id} does not exist`);
      }

      if (prize.contest.user !== context.user.id) {
        throw new Error('You do not have permission to delete this prize');
      }

      return prizeRepository.deletePrize(prize.id);
    }
  }
};
