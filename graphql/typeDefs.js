const gql = require('graphql-tag')

module.exports = gql`
    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
        user:String!
        comments: [Comment]!
        likes:[Like]!
        likeCount:Int!
        commentCount:Int!
    }
    type Comment{
        id:ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id:ID!
        createdAt:String!
        username:String!
    }
    type User{
        id:ID!
        email:String!
        token:String! 
        username:String! 
        createdAt: String!
        about: String
        gender:String
    }
    input RegisterInput{
        username:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    input ProfileInput{
        id:ID!
        username:String!
        email:String!
        about: String!
        gender:String!  
    }
    type Query{
        getPosts:[Post]!
        getPost(postId: ID!):Post
        getUser(userId:ID!):User
    }
    type Mutation{
        profileUpdate(profileInput:ProfileInput):User!
        register(registerInput:RegisterInput):User!
        login(username:String!,password:String!):User!
        createPost(body:String!):Post!
        deletePost(postId:ID!):String!
        createComment(postId:ID!,body:String!):Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        likePost(postId:ID!):Post!
    }
`
