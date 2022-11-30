import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import './login.css'


function Login() {
    const history = useNavigate()
    const [ userName, setUsername ] = useState('')
    const [ enteredUsers, setEnteredUsers ] = useState([])
    const onNameChange = (event) => {
        setUsername(event.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(userName === '') {
            alert('Name is required')
            return false;
        }
        fetch('https://test-4ae1d-default-rtdb.firebaseio.com/users.json')
        .then(res => res.json())
        .then(data => {
                setEnteredUsers(data)
        });
        fetch('https://test-4ae1d-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName
            })

        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
        localStorage.setItem('name', userName)
        history('/messages')
    }
  return (
    <div className='login_container'>
        <Form action="" onSubmit={submitHandler}>
            <Form.Label htmlFor="name">Enter the name:</Form.Label>
            <Form.Control type="text" name="name" id="name" onChange={onNameChange} />
            <Button variant='primary' type='submit'>Submit</Button>
        </Form>
    </div>
  )
}

export default Login