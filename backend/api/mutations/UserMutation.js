const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const UserType = require('./../types/UserType');
const userRepository = require('./../repositories/UserRepository');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  registerUser: {
    type: UserType,
    args: {
      name: {
        type: GraphQLString,
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password_confirmation: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: (rootValue, input) => {
      if (input.email && !validator.isEmail(input.email)) {
        throw new Error('Email is not in valid format');
      }

      if (input.password !== input.password_confirmation) {
        throw new Error('Passwords does not match');
      }

      return userRepository.createUser({
        email: input.email,
        password: input.password,
        name: input.name || ''
      });
    }
  },
  loginUser: {
    type: UserType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: async (rootValue, input) => {
      if (input.email && !validator.isEmail(input.email)) {
        throw new Error('Email is not in valid format');
      }

      const user = await userRepository.findByEmail(input.email);

      if (!user) {
        throw new Error('User does not exist');
      }

      const isPasswordCorrect = await bcrypt.compare(input.password, user.password);

      if (!isPasswordCorrect) {
        throw new Error('Invalid password');
      }

      user.token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          id: user.id
        },
        sails.config.custom.appKey,
        {
          expiresIn: '24h'
        }
      );

      return user;
    }
  }
};
