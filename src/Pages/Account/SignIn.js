import React, { useState } from 'react'
import axios from 'axios';
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useProfile } from './Context.Provider';

function SignIn() {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setloading] = useState(false);
    const {profile} = useProfile();
    const History = useHistory();

    if(profile){
        History.push('/');
    }
    
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    });
    const SIGNUP = [
        {
            name:'name',
            value:user.name,
            type:'text',
            text:'Enter Your Full Name'
        },
        {
            name:'email',
            value:user.email,
            type:'email',
            text:'Enter Your Email'
        },
        {
            name:'password',
            value:user.password,
            type:'password',
            text:'Enter Your Password'
        },
        {
            name:'cpassword',
            value:user.cpassword,
            type:'password',
            text:'Enter Your Password Again'
        }
    ]
    let name, value;
    const inputHandler = (e)=>{
        name = e.target.name;
        value= e.target.value;
        setUser({...user, [name]:value});
    }
    const signup = async (e)=>{
        e.preventDefault();
        try{
            setloading(true);
            const signup = await axios.post('https://lifestylediseases.herokuapp.com/signup',{
                name : user.name, 
                email : user.email, 
                password : user.password, 
                cpassword : user.cpassword, 
                role : "doctor" 
            })
            setloading(false);
            setMessage(signup.data.message);
            setShow(true);
            setUser({
                name:'',
                email:'',
                password:'',
                cpassword:''
            });
        }catch(e){
            setloading(true)
            console.log(e.message);
            setMessage(e.message);
            setloading(false);
        }
    }
    return (
        <Container className="mt-4 account_form">
            <Row id="account_heading">
                <h3>Register Now</h3>
                <p>Register As A Doctor</p>
            </Row>
            <Form className="account_form_body mt-2">
                { 
                show ?
                    <Alert variant="info" onClose={() => {
                        setShow(false);
                        History.push('/login');
                    }
                    } dismissible>
                    <p className='text-center'>{message}</p>
                    </Alert>
                    :
                    ''
                }
                {SIGNUP.map(item =>(
                    <Row key={item.text}>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                name={item.name}
                                type={item.type}
                                value={item.value}
                                onChange={inputHandler}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">{item.text}</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    ))
                }
                <Row>
                    <Col xl={6} className="account_button text-center mt-2">
                        <Button type="submit" onClick={signup} disabled={!user.email}> {loading ? 'Processing...' : 'SignUp Now' }</Button>
                        <p>You are Alrady Register,Please <Link to="/login">Login Here.</Link></p>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default SignIn