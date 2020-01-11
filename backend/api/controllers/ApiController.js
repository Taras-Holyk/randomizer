const { graphql, GraphQLSchema, GraphQLObjectType } = require('graphql');
const UserMutation = require('./../mutations/UserMutation');
const ContestMutation = require('./../mutations/ContestMutation');
const ContestParticipantMutation = require('./../mutations/ContestParticipantMutation');
const UserQuery = require('./../queries/UserQuery');
const ContestQuery = require('./../queries/ContestQuery');

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
        fields: () => ({
          ...UserQuery,
          ...ContestQuery
        }),
      }),
      mutation: new GraphQLObjectType({
        name: 'RootMutation',
        fields: () => ({
          ...UserMutation,
          ...ContestMutation,
          ...ContestParticipantMutation
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

