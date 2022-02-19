import gql from "graphql-tag";
export const FETCH_POST_QUERY = gql`
{
  getPosts {
    id
    body
    createdAt
    username
    user
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;


export const FETCH_USER_QUERY = gql`
query($userId:ID!){
  getUser(userId:$userId){
        id
        username
        email
        gender
        email
        about
  }
}
`