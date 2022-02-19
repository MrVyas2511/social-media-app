import React   from 'react'
import { useParams } from 'react-router-dom';
import { FETCH_POST_QUERY } from '../util/graphql';
import { useQuery } from '@apollo/client';
import { Grid,Transition } from "semantic-ui-react";
import UserCard from '../components/UserProfile/UserCard';
import PostCard from '../components/PostCard';
 
function UserProfile() {

    let params = useParams();
    const userId = params.userId;
     console.log(userId);
    const {loading, data } = useQuery(FETCH_POST_QUERY);

    console.log(data);
    if (loading) return "Loading...";

    return (
        <>
            <Grid stackable columns={2}>
                <Grid.Row>
                   <h2 className='title'> User Profile</h2> 
                </Grid.Row>
            <Grid.Row>
          <Grid.Column>
                        <UserCard userId={userId} />    
                    </Grid.Column>
                    <Grid.Column>
                        <h4 className='title'> Posts History </h4>
            {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
            <Transition.Group>
               {data.getPosts &&
          data.getPosts.map((post) => ( post.user===userId &&(
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} userId={userId} />
              </Grid.Column>
          )
          ))}
          </Transition.Group>
                        )}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
        </>
   )
}

export default UserProfile