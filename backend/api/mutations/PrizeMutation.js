const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const slugify = require('slugify');
const moment = require('moment');
const PrizeType = require('./../types/PrizeType');
const ContestType = require('./../types/ContestType');
const prizeRepository = require('./../repositories/PrizeRepository');
const contestRepository = require('./../repositories/ContestRepository');

module.exports = {
  addPrize: {
    type: PrizeType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      place: {
        type: new GraphQLNonNull(GraphQLString)
      },
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      },
    },
    resolve: async (rootValue, input, context) => {

      return prizeRepository.createContest({
        user: context.user.id,
        permalink: slugify(input.name),
        name: input.name,
        startDate: moment(input.startDate).format('YYYY-MM-DD'),
        endDate: moment(input.endDate).format('YYYY-MM-DD'),
        isActive: input.isActive,
        isFinished: 0
      });
    }
  },
  updateContest: {
    type: ContestType,
    args: {
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      startDate: {
        type: new GraphQLNonNull(GraphQLString)
      },
      endDate: {
        type: new GraphQLNonNull(GraphQLString)
      },
      isActive: {
        type: GraphQLInt
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      const contest = await contestRepository.findById(input.contestId).populate('user');
      if (!contest) {
        throw new Error(`Contest with id ${input.contestId} does not exist`);
      }

      if (contest.user.id !== context.user.id) {
        throw new Error('You don not have permission to edit this contest');
      }

      const contestData = {
        permalink: slugify(input.name),
        name: input.name,
        startDate: moment(input.startDate).format('YYYY-MM-DD'),
        endDate: moment(input.endDate).format('YYYY-MM-DD')
      };

      if ('isActive' in input) {
        contestData.isActive = input.isActive;
      }

      return contestRepository.updateContest(contest.id, contestData);
    }
  },
  deleteContest: {
    type: ContestType,
    args: {
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      const contest = await contestRepository.findById(input.contestId).populate('user');
      if (!contest) {
        throw new Error(`Contest with id ${input.contestId} does not exist`);
      }

      if (contest.user.id !== context.user.id) {
        throw new Error('You don not have permission to delete this contest');
      }

      return contestRepository.deleteContest(contest.id);
    }
  }
};
