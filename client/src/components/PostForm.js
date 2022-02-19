import { useMutation } from '@apollo/client';
 import gql from 'graphql-tag';
import React from 'react'
import { Form,Button } from 'semantic-ui-react'

import { useForm } from '../util/hooks'
import { FETCH_POST_QUERY } from "../util/graphql";


export default function PostForm() {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ""
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({
                query:FETCH_POST_QUERY
            })

            proxy.writeQuery({
                query: FETCH_POST_QUERY,
                data: {
                    getPosts : [result.data.createPost, ...data.getPosts]
            }})
            values.body = "";
        }
    })

    function createPostCallback(){
        createPost();
    }
    return (
      <>
      <Form onSubmit={onSubmit}>
          <h2>Create a post : </h2>
          <Form.Field>
              <Form.Input
                  placeholder="Hi World!"
                  name="body"
                  onChange={onChange}
                        value={values.body}
                        error={error?true:false}
              />
              <Button type="submit" color="teal">
                  Submit
            </Button>
        </Form.Field>
      </Form>
      
      {
        error && (
            <div className='ui error message' style={{marginBottom:20}}>
                <ul className='list'>
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )
    }
    </>
  )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body:String!){
        createPost(body:$body){
            id body createdAt username 
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id username createdAt
            }
            commentCount
        }
    }

`