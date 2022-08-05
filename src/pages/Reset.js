import React,{useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {AuthProvider, useAuth} from '../context/AuthProvider.js'
import '../css/account.css'

function Reset() {
    const emailRef=useRef()
    const {passwordReset}=useAuth();
    const [error,setError]=useState("")
    const [loading, setLoading]=useState(false)

    ////////

    async function handleSubmit(e){
        e.preventDefault()
  
        try{
            setError("")
            setLoading(true)
            await passwordReset(emailRef.current.value)
            alert("Email sent to: " + emailRef.current.value)
            e.target.reset();

        }
        catch{
            setError("Email does not exist")
        }
  
        setLoading(false)
  
        
    }
  
    return (
        <>
        <div className="sign">
            <Card>
                <Card.Body>
                    <h2>Reset</h2>
                    {/* {error&&<Alert variant="danger">{error}</Alert>} */}
                   <Form onSubmit={handleSubmit}>
                      
                        <Form.Group id="email">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
  
                        <br/>
  
                        <Button 
                        disabled={loading}
                        type="submit">Reset email!</Button>

                    </Form>
                   
                </Card.Body>
            </Card>
    
            
        </div>
        </>
    )
  }

export default Reset