const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql');
const ContestType = require('./ContestType');

module.exports = new GraphQLObjectType({
  name: 'ContestsList',
  description: 'This represent a contests list',
  fields: () => ({
    total: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    contests: {
      type: new GraphQLList(ContestType)
    }
  })
});
