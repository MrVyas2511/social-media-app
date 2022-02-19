import { useMutation } from '@apollo/client'
import React, { Component, useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import gql from 'graphql-tag'
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function FormExampleSubcomponentControl({ user: {id, username, email, gender, about } ,setEdit})  {
 
        
    const { values, onChange, onSubmit } = useForm(createUpdateProfileCallback, {
        id,  
        username,
        email,
        gender:gender?gender:"",
        about:about?about:""
    })
    
    const [createProfile, { error }] = useMutation(CREATE_PROFILE_MUTATTION, {
        variables: values,
      update(proxy, result) {
        console.log(result);
        setEdit(false);  
        window.location.reload();
      }
        
})

    function createUpdateProfileCallback(){
        createProfile();
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
           onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
           onChange={onChange}
        />
      
          <Form.Input
            label='Gender'
            name="gender"
            type='text'
            placeholder='Gender'
            value={values.gender}        
            onChange={onChange}
          />
     
            <Form.TextArea label='About'
                name="about"
                value={values.about}
                onChange={onChange}
                placeholder='Tell us more about you...' />
         <Form.Button type='submit'>Submit</Form.Button>
      </Form>
    )
  
}

const CREATE_PROFILE_MUTATTION = gql`
  mutation profileUpdate(
        $id:ID!
        $username:String!
        $email:String!
        $about: String!
        $gender:String!
  ) {
    profileUpdate(
      profileInput: {
        id:$id
        username: $username
        email: $email
        gender:$gender
        about:$about
      }
    ) {
      id
      username
      gender
      email
      about
    }
  }
`;

const FETCH_USER_QUERY = gql`
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
`;