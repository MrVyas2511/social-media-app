import React, { useState } from 'react'
import { AuthContext } from '../context/auth'
import { useContext } from 'react'
import moment from 'moment';
import ProfileForm from '../components/ProfileForm'
import { Button, Grid } from 'semantic-ui-react';
 import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FETCH_USER_QUERY } from '../util/graphql';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let userId;
  console.log(user);
  if (!user) {
    navigate('/')
  }
  else {
     userId = user.id;
  }
  const [edit, setEdit] = useState(false);

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId
    }
  })

  if (loading) return "Loading..."

  console.log(data);
 
  return (
    <>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            <div style={{ margin: '50px' }}>
      <h3>Username : {user.username}</h3>
      <h3>About: {data.getUser.about}</h3>
      <h3>Email : {data.getUser.email}</h3>
      <h3>Gender:{data.getUser.gender}</h3>
      <h3>CreatedAt : {moment(user.createdAt).format()}</h3> 
           </div>
        </Grid.Column>
      
        <Grid.Column>

      {edit && <ProfileForm user={user} setEdit={setEdit} edit></ProfileForm>}
            {!edit && <Button onClick={() => setEdit(true)}>Edit</Button>}
      </Grid.Column>

        </Grid.Row>
      </Grid>
      </>
  )
}

