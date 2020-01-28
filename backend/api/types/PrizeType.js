const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const ContestType = require('./ContestType');
const contestRepository = require('./../repositories/ContestRepository');

module.exports = new GraphQLObjectType({
  name: 'Prize',
  description: 'This represent a prize',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    place: {
      type: new GraphQLNonNull(GraphQLString)
    },
    contest: {
      type: new GraphQLNonNull(ContestType),
      resolve: (parent) => {
        if (parent.contest && Object.keys(parent.contest).length) {
          return parent.contest;
        }

        return contestRepository.findById(parent.contest);
      }
    }
  })
});
