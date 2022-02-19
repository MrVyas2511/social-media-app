import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid,Transition } from "semantic-ui-react";

import {AuthContext} from '../context/auth'
import PostCard from "../components/PostCard";
import PostForm from '../components/PostForm';
import { FETCH_POST_QUERY } from "../util/graphql";

export default function Home() {

  const {user} = useContext(AuthContext)
  const {loading, data } = useQuery(FETCH_POST_QUERY);

  console.log(data);
  if (loading) return "Loading...";

  return (
    <Grid stackable columns={3}>
      {!user && (<Grid.Row className="warning">
        <h4>Please do login to create your post!!. </h4>
      </Grid.Row>)}
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm></PostForm>
          </Grid.Column>
        )}

        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
            <Transition.Group>
               {data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} userId={post.user} />
            </Grid.Column>
          ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}


