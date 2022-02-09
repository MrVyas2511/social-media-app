const postResolvers = require('./post');
const userResolvers = require('./user');
const commentsResolvers = require('./Comments');

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}