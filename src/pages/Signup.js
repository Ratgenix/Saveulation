import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthProvider'

import '../css/account.css'

function Signup () {
    const emailRef=useRef()
  const passwordRef=useRef()
  const passwordConfirmRef=useRef()
  const userRef=useRef()
  const {login, currentUser, logout, signupUser, users} = useAuth()
  const [error,setError]=useState("")
  const [loading, setLoading]=useState(false)
  const [input, setValues] = useState(
    {
    user:'',
    email:'',
    password1:'',
    password2:''
})


///

// function clearFields(){
//     setValues(        {
//         user:'',
//         email:'',
//         password1:'',
//         password2:''
//     })
//     // userRef.reset();
//     console.log(input)
// }

const onChange= (event)=>{
    setValues({...input,[event.target.name]:event.target.value});
    console.log(input)
    //setTrueVal({...truValue, input})
    // console.log(truValue)
}

  async function handleSubmit(e){
      e.preventDefault()

      if(passwordRef.current.value!==passwordConfirmRef.current.value){
          return setError("Passwords do not match")
      }
      else if (userRef.length<=0 || userRef.length<=0 || passwordRef.length<=0 || passwordRef.length <=0){
        console.log("You must complete the form!!")
        return setError("You must complete the form!!")
    }
      try{
         
          setLoading(true)
        //   await login(emailRef.current.value, passwordRef.current.value )
          await signupUser(emailRef.current.value, passwordRef.current.value, userRef.current.value)
          setError("Account creation successful !! Now logged in !")
          e.target.reset();
        }
      catch{
          setError("Failed to create account")
      }

      setLoading(false)

      
  }

  return (
      <>
      <div className="sign">
          <Card>
              <Card.Body>
              {currentUser && 
                  <h2>Sign Up</h2> }
                  {/* {currentUser&&currentUser.email} */}
                  {error&&<Alert variant="danger">{error}</Alert>}

                 
                  <Form onSubmit={handleSubmit}>
                 
                  {!currentUser && 
                  <Form.Group id="line">
                          <Form.Label>Username: </Form.Label>
                          <Form.Control name='user' type="username" ref={userRef} onChange={onChange} required/>
                      </Form.Group>
 }
 {!currentUser && 
                      <Form.Group id="line">
                          <Form.Label>Email: </Form.Label>
                          <Form.Control name='email'type="email" ref={emailRef} onChange={onChange} required/>
                      </Form.Group>
}
{!currentUser && 
                      <Form.Group id="line">
                          <Form.Label>Password: </Form.Label>
                          <Form.Control name='password1' type="password" ref={passwordRef} onChange={onChange} required/>
                      </Form.Group>   
}
{!currentUser && 
                      <Form.Group id="line">
                          <Form.Label>Confirm Password: </Form.Label>
                          <Form.Control name='password2' type="password" ref={passwordConfirmRef} onChange={onChange} required/>
                      </Form.Group> 
}
                     {!currentUser && <Button 
                      disabled={loading}
                      type="submit">Confirm!</Button> }

                     {currentUser &&   <Button 
                      disabled={loading}
                      onClick={logout}>Logout</Button> }

                      {/* <Button onClick={clearFields}>Clear Fields</Button> */}
                  </Form>
              </Card.Body>
            
          </Card>

          
      </div>
      </>
  )
}

export default Signup