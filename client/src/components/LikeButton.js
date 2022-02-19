import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Button,Label,Icon,Popup } from 'semantic-ui-react';

export default function LikeButton({user,post:{id,likes,likeCount}}) {
    
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    },[user,likes])
  
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables:{postId:id}
    })
    const likeButton = user ? (
        liked ? (
            <Button color='teal' size='mini'>
                <Icon name="heart"/>
            </Button>
        ) : (
            <Button color='teal' size='mini' basic>
            <Icon name="heart"/>
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' color='teal' size='mini' basic>
        <Icon name="heart"/>
        </Button>
            
    )
    return (
        <Popup 
            content={liked?"Unliked":"Liked"}
            inverted
            trigger={
                <Button as="div" labelPosition="right" size='mini'  onClick={likePost}>
                    {likeButton}
                    <Label basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
            }
            />
  )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId:ID!){
        likePost(postId:$postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`
