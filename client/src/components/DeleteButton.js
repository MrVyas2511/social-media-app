import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button,Icon,Confirm,Popup } from 'semantic-ui-react'

import { FETCH_POST_QUERY } from '../util/graphql'

export default function DeleteButton({postId,commentId,callback}) {
    
    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation= commentId?DELETE_COMMENT_MUTATION:DELETE_POST_MUTATION
    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            // TODO : remove post from cache
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POST_QUERY
                });
    
        
                proxy.writeQuery({
                    query: FETCH_POST_QUERY,
                    data: {
                    getPosts:data.getPosts.filter(p => p.id !== postId)
                }})
            }

            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    })
  
    return (
        <>
            <Popup
                content={commentId ? "Delete Comment" : "Delete Post"}
                inverted
                trigger={
                    <Button as='div' basic size='mini' color='red' floated="right" onClick={() => setConfirmOpen(true)}>
                        <Icon name="trash" color='red' style={{ margin: 0 }}></Icon>
                    </Button>
                }
            />
        <Confirm
            open={confirmOpen}
                onClick={()=>setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
        >
                
            </Confirm>
            
            </>
  )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }
`
const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId:ID!,$commentId:ID!){
        deleteComment(postId:$postId,commentId:$commentId){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`