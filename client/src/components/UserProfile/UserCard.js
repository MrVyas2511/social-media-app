import React, { useContext } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import { FETCH_USER_QUERY, FETCH_POST_QUERY} from '../../util/graphql';
import { useQuery } from '@apollo/client';
import { Grid,Transition } from "semantic-ui-react";

const extra = (
  <a>
    <Icon name='user' />
    16 Friends
  </a>
)

function UserProfile({userId}) {

    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: {
          userId
        }
    })


    
    if (loading) return "Loading..."
    console.log(data);

    return (
        <Card
        image='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        header={data.getUser.username}
        meta={data.getUser.gender}
        description={data.getUser.about}
        extra={data.getUser.email}
        />        
            
   )
}

export default UserProfile