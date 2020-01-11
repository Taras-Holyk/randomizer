const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const UserType = require('./UserType');
const userRepository = require('./../repositories/UserRepository');
const contestRepository = require('./../repositories/ContestRepository');

module.exports = new GraphQLObjectType({
  name: 'Contest',
  description: 'This represent a contest',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    permalink: {
      type: new GraphQLNonNull(GraphQLString)
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
    isFinished: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isActive: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: (parent) => {
        if (parent.user && Object.keys(parent.user).length) {
          return parent.user;
        }

        return userRepository.findById(parent.user);
      }
    },
    participants: {
      type: new GraphQLList(UserType),
      resolve: async (parent) => {
        if (parent.participants && parent.participants.length) {
          return parent.participants;
        }

        const contest = await contestRepository.findById(parent.id).populate('participants');

        return contest.participants || [];
      }
    }
  })
});
