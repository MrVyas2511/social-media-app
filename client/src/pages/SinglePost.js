import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useContext, useRef, useState } from 'react'
import { Button, Card, Grid,Image,Icon,Label,Form, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

export default function SinglePost(props) {
    
    const navigate = useNavigate();
    let params = useParams();
    const postId = params.postId;
    const { user } = useContext(AuthContext);
    const commentInpuRef = useRef();

    const [comment, setComment] = useState("");

    const {loading, data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment("");
            commentInpuRef.current.blur();
        },
        variables:{
            postId,
            body:comment
        }
    })

    if (loading) return "Loading..."
    
    function deletePostCallback() {
        navigate('/');
    }

    let postMarkup;

    if (!data.getPost) {
        postMarkup = <p>Loading Post...</p>
    } else {
        const { id, username, createdAt, body, comments, likes, likeCount, commentCount } = data.getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image
                        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                        size="small"
                        float="right" />
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }}></LikeButton>
                                
                                <Popup 
                                    content="Comment no Post"
                                    inverted
                                    trigger={
                                        <Button
                                            as="div"
                                            labelPosition="right"
                                            size='mini'
                                            onClick={() => console.log("Comment")}>
                                            <Button basic color='blue' size='mini'>
                                                <Icon name="comments"></Icon>
                                            </Button>
                                            <Label basic color="blue" pointing="left">
                                                {commentCount}
                                            </Label>
                                        </Button>
                                    }
                                />
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback}></DeleteButton>
                                )}
                            </Card.Content>
                        </Card>

                        {user && (
                            <Card fluid style={{width:'80%'}}>
                                <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className='ui action input fluid'>
                                        <input
                                            type="text"
                                            placeholder="Comment..."
                                            name="Comment"
                                            value={comment}
                                            onChange = {event=>setComment(event.target.value)}
                                            ref = {commentInpuRef}
                                            ></input>
                                        <button type='submit' className='ui button teal'
                                            disabled={comment.trim() === ""}
                                            onClick={submitComment}
                                        >Submit</button>
                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{ moment(comment.createdAt).fromNow() }</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }

    return (
        postMarkup
  )
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId:ID!,$body:String!){
        createComment(postId:$postId,body:$body){
            id
            comments{
                id body createdAt username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId:ID!){
        getPost(postId:$postId){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`
