const { GraphQLID, GraphQLNonNull } = require('graphql');
const ContestType = require('./../types/ContestType');
const contestParticipantRepository = require('./../repositories/ContestParticipantRepository');
const contestRepository = require('./../repositories/ContestRepository');

module.exports = {
  addContestParticipant: {
    type: ContestType,
    args: {
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      participantId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      await contestParticipantRepository.addContestParticipant(input.contestId, input.participantId);

      return contestRepository.findById(input.contestId).populate('participants');
    }
  },
  deleteContestParticipant: {
    type: ContestType,
    args: {
      contestId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      participantId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, input, context) => {
      await sails.helpers.checkAuthUser(context.user);

      await contestParticipantRepository.deleteContestParticipant(input.contestId, input.participantId);

      return contestRepository.findById(input.contestId).populate('participants');
    }
  }
};
