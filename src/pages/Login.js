import React,{useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {AuthProvider, useAuth} from '../context/AuthProvider.js'
import '../css/account.css'

function Login() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const {signin, currentUser, logout, user, users, findUser}=useAuth();
  const [error,setError]=useState("")
  const [loading, setLoading]=useState(false)

  async function handleLogout(e){
      setError("")
      try{
         await logout()
      }
      catch{
          setError("Failed to logout... what duh...")
      }
  }

  async function handleSubmit(e){
      e.preventDefault()

      try{
          setError("")
          setLoading(true)
          await signin(emailRef.current.value, passwordRef.current.value)
      }
      catch{
          setError("Failed to log into account")
      }

      setLoading(false)

      
  }

  return (
      <>
      <div className="sign">
          <Card>
              <Card.Body>
                  <h2>Login</h2>
                  {/* {console.log(user)} */}
                  
                  {/* {user.email} */}
                  {currentUser && <div><p>Already logged on!</p>
                      <p><a href='/'>Home</a></p></div>}
                      
                      {currentUser &&   <Button 
                      disabled={loading}
                    //   onClick={logout}>Logout</Button> }
                    onClick={logout}>Logout</Button> }
                  {error&&<Alert variant="danger">{error}</Alert>}
                 {!currentUser && <Form onSubmit={handleSubmit}>
                    
                      <Form.Group id="email">
                          <Form.Label>Email: </Form.Label>
                          <Form.Control type="email" ref={emailRef} required/>
                      </Form.Group>

                      <Form.Group id="password">
                          <Form.Label>Password: </Form.Label>
                          <Form.Control type="password" ref={passwordRef} required/>
                      </Form.Group>   

                      <br/>

                      <Button 
                      disabled={loading}
                      type="submit">Login!</Button>

                      <p>Forgot Password? Click <a href='/reset'>here!</a></p>
                      
                  </Form>}
                 
              </Card.Body>
          </Card>
  
          
      </div>
      </>
  )
}

export default Login