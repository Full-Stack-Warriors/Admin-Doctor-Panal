import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import Moment from 'react-moment';

function DoctorVerify({id}) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [popup, setPopup] = useState(false);
    const [loading, setIsloading] = useState(false);
    const [account, setAccount] = useState({
        name: '',
        email: '',
        address: {
            city : '',
            area: '',
            pin_code: '',
        }
    });

    const [doctorprofile, setdoctorProfile] = useState({
        contact_no:'',
        about:'',
        degree: '',
        profection: '',
        certificate: '',
        replay: '',
        status: ``,
        verify_date: '',
    });
    console.log(doctorprofile);
      
    useEffect(()=>{
        const getid = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/profile/${id}`);
                setAccount({
                    name: res.data.name ? res.data.name : '',
                    email: res.data.email ? res.data.email : '',
                    address: {
                        city : res.data.address.city ? res.data.address.city : '',
                        area: res.data.address.area ? res.data.address.area : '',
                        pin_code: res.data.address.pin_code ? res.data.address.pin_code : '',
                    }
                })

            }catch(e){
                console.log(e.message);
            }
        }
        getid()
    },[id]);

    useEffect(()=>{
        const getdoctorid = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/doctor/${id}`);
                setdoctorProfile({
                    contact_no:res.data.contact_no ? res.data.contact_no : '',
                    about:res.data.about ? res.data.about : '',
                    degree: res.data.Education_Detailes.degree ? res.data.Education_Detailes.degree : '',
                    profection: res.data.Education_Detailes.profection ? res.data.Education_Detailes.profection : '',
                    certificate: res.data.Education_Detailes.degree_certificate ? res.data.Education_Detailes.degree_certificate : '',
                    replay: res.data.verification_status.replay ? res.data.verification_status.replay : '',
                    status: res.data.verification_status.status ? res.data.verification_status.status : '',
                    verify_date: res.data.verification_status.verify_date ? res.data.verification_status.verify_date : ''
                });
            }catch(e){
                console.log(e.message);
            }
        }
        getdoctorid()
    },[id])

  return (
      <>
      <i className="fas fa-user-edit" onClick={()=> {
            setPopup(true);
        }}></i>
        <Modal  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            show={popup}
        >
            <Modal.Header closeButton onHide={()=> setPopup(false)}>
                <Modal.Title style={{color:'#008aff', fontWeight:700}}>Doctor Detailes Verify</Modal.Title>
            </Modal.Header>
                { 
                show ?
                    <Alert variant="info" onClose={() => {
                        setShow(false);
                        setPopup(false);
                    }
                    } dismissible>
                        <p className='text-center'>{message}</p>
                    </Alert>
                    :
                    ''
                }
            <Modal.Body style={{height: '60vh', overflowY: 'scroll'}}>
                <Form className="account_form_body mt-2">
                    <Row className="text-center">
                        <p>Personal Detailes</p>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={account.name}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Name</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='email'
                                value={account.email}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Email</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='email'
                                value={account.email}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Email</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctorprofile.contact_no}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Contact Number</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={12}>
                            <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="About">
                                <Form.Control
                                type='text'
                                value={doctorprofile.about}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p>&nbsp;&nbsp;Address Detailes</p>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={account.address.city}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">City Name</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={account.address.area}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Area Name</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={account.address.pin_code}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Pin Code</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p>Eduction Detailes</p>
                    </Row>
                    <Row className='justify-content-center align-items-center'>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctorprofile.degree}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Degree</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctorprofile.profection}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Specialization</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctorprofile.certificate}
                                placeholder="name@example.com"
                                />
                                <label  htmlFor="floatingInputCustom">Doctor Specialization</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <a href={doctorprofile.certificate} target='_blank'  rel='noopener noreferrer'><Button style={{ backgroundColor: '#008aff',
                            fontFamily: `Poppins, sans-serif`,
                            fontWeight:'500'}} >View Certificate</Button></a>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p>Verification Detailes</p>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Select onChange={
                                    (e)=>{
                                        const sta = e.target.value;
                                        if(sta === 'false'){
                                            setdoctorProfile({...doctorprofile, status: false})
                                        }else{
                                            setdoctorProfile({...doctorprofile, status: true})
                                        }
                                    }
                                }>
                                    <option value={doctorprofile.status}>{doctorprofile.status ? 'Verified' : 'Pending'}</option>
                                    <option value="false">Panding</option>
                                    <option value="true">Verified</option>
                                </Form.Select>
                                <label htmlFor="floatingInputCustom">Status</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <p>&nbsp;<b>Verification Date :</b> <span><Moment format='DD MMMM YYYY' date={doctorprofile.verify_date} /></span></p>
                        </Col>
                        <Col xl={12}>
                            <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Replay">
                                <Form.Control
                                type='text'
                                value={doctorprofile.replay}
                                as="textarea"
                                onChange={
                                    (e)=>{
                                        setdoctorProfile({...doctorprofile, replay : e.target.value})
                                    }
                                }
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button disabled={!doctorprofile.replay} style={{ backgroundColor: '#008aff',
                    fontFamily: `Poppins, sans-serif`,
                    fontWeight:'500'}}  onClick={async()=>{
                        try{
                            setIsloading(true);
                            const res = await axios.put(`https://lifestylediseases.herokuapp.com/doctor/${id}`,{
                                verification_status:{
                                    status: doctorprofile.status,
                                    replay : doctorprofile.replay,
                                    verify_date: new Date() 
                                }                      
                            });
                            setMessage(res.data.message);
                            setShow(true);
                            setIsloading(false);
                        }catch(e){
                            console.log(e.message);
                        }
                    }}>{loading ? 'Processing...' : 'Verify Now'}</Button>
            </Modal.Footer>
        </Modal>
      </>
  );
}

export default DoctorVerify;
