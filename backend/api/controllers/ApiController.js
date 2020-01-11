const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const User = require('./../types/UserType');
const UserMutation = require('./../mutations/UserMutation');

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function(req, res) {
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
          user: {
            type: User
          }
        },
      }),
      mutation: new GraphQLObjectType({
        name: 'RootMutation',
        fields: () => ({
          ...UserMutation
        })
      })
    });

    graphql(
      schema,
      req.body.query,
      null,
      {
        request: sails.request,
        reqData: {
          headers: {
            'Content-Type': 'application/json;'
          }
        },
        user: await sails.helpers.getAuthenticatedUser(req.headers)
      }
    ).then(result => {
      res.json(result);
    });
  }
};

