import React, { useState } from 'react'
import axios from 'axios';
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useProfile } from '../Account/Context.Provider';

function AddDoctorProfile() {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const {profile,doctorProfile} = useProfile();
    const [loading, setloading] = useState(false);
    const registerId = profile ? profile._id : '';
    const History = useHistory();

    if(!profile){
        History.push('/login');
    }

    const [user,setUser] = useState(
        {
            contact_no:doctorProfile ? doctorProfile.contact_no : '',
            about: doctorProfile ? doctorProfile.about : '',
            degree: doctorProfile ? doctorProfile.Education_Detailes.degree : '',
            profection: doctorProfile ? doctorProfile.Education_Detailes.profection : '',
            degree_certificate: doctorProfile ? doctorProfile.Education_Detailes.degree_certificate : ''
        }
    );

    const DOCTOR = [
        {
            name:'contact_no',
            value:user.contact_no,
            type:'text',
            text:'Enter Your Contact Number'
        },
        {
            name:'about',
            value:user.about,
            type:'text',
            text:'Enter Sonthing About You'
        },
        {
            name:'degree',
            value:user.degree,
            type:'text',
            text:'Enter Your Degree'
        },
        {
            name:'profection',
            value:user.profection,
            type:'text',
            text:'Enter Your Profection'
        },
        {
            name:'degree_certificate',
            value:user.degree_certificate,
            type:'text',
            text:'Enter Your Degree Certificate ( Enter URL Uploaded Any whaere)'
        }
    ]
    let name, value;
    const inputHandler = (e)=>{
        name = e.target.name;
        value= e.target.value;
        setUser({...user, [name]:value});
    }
    const doctorRegistration = async (e)=>{
        e.preventDefault();
        try{
            setloading(true);
            const register = await axios.post(`https://lifestylediseases.herokuapp.com/doctorprofile/${registerId}`,{
                contact_no:user.contact_no,
                about:user.about,
                Education_Detailes:{
                    degree:user.degree,
                    profection:user.profection,
                    degree_certificate:user.degree_certificate
                }
            })
            setloading(false);
            setMessage(register.data.message);
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
                <h3><span>{profile ? profile.name : ''}</span> Register</h3>
                <p>Please Complete Your Profile ASAP</p>
            </Row>
            <Form className="account_form_body mt-2">
                { 
                show ?
                    <Alert variant="info" onClose={() => {
                        setShow(false);
                        History.push('/logout');
                    }
                    } dismissible>
                    <p className='text-center'>{message}</p>
                    </Alert>
                    :
                    ''
                }
                {DOCTOR.map(item =>(
                   
                    <Row key={item.text}>
                        {item.name !== 'about'
                        ?
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
                            :
                            <Col xl={6}>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                    name={item.name}
                                    type={item.type}
                                    value={item.value}
                                    onChange={inputHandler}
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '150px' }}
                                    />
                                    <label htmlFor="floatingInputCustom">{item.text}</label>
                                </Form.Floating>
                            </Col>
                        }
                    </Row>
                    ))
                }
                <Row>
                    <Col xl={6} className="account_button text-center mt-2">
                        <Button type="submit" onClick={doctorRegistration} disabled={!user.degree_certificate}> {loading ? 'Processing...' : 'Register Now' }</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AddDoctorProfile