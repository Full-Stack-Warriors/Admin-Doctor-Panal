import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useProfile } from '../../Account/Context.Provider';
import { useHistory } from 'react-router';

function DiseaseVerify({id,role,icon}) {
    const [show, setShow] = useState(false);
    const History = useHistory();
    const {profile} = useProfile();
    const [message, setMessage] = useState('');
    const [popup, setPopup] = useState(false);
    const [loading, setIsloading] = useState(false);
    if(!profile){
        History.push('/');
    }else if(profile.role === 'Doctor'){
        History.push('/');
    }
    const [diseaseInfo, setDiseaseInfo] = useState({
        doctor_id: profile ? profile._id : '',
        desease_name: '',
        image:'',
        description:'',
        symptoms:[],
        precaution:[],
        medicine:[],
        vaccine:[],
        status:'',
        verify_date:'',
        replay:'',
        city:'',
        area:'',
        visibility:''
    });
    const [doctor, setDoctor] = useState({
        name: '',
        email: ''
    });
    const [doctorEduction, setDoctorEduction] = useState({
        contact_no:'',
        degree: ''
    });

    useEffect(()=>{
        const getdiseaseid = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/disease/${id}`);
                    setDiseaseInfo({
                    doctor_id: res.data.doctor_id ? res.data.doctor_id : '',
                    desease_name: res.data.desease_name ? res.data.desease_name : '',
                    image: res.data.detail.image ? res.data.detail.image : '',
                    description:res.data.detail.description ? res.data.detail.description : '',
                    symptoms:res.data.detail.symptoms ? res.data.detail.symptoms : '',
                    precaution:res.data.detail.precaution ? res.data.detail.precaution : '',
                    medicine:res.data.detail.medicine ? res.data.detail.medicine : [],
                    vaccine:res.data.detail.vaccine ? res.data.detail.vaccine : [],
                    status:res.data.verification_status.status ? res.data.verification_status.status : false,
                    verify_date:res.data.verification_status.verify_date !=='NA' ? res.data.verification_status.verify_date : new Date(),
                    replay:res.data.verification_status.replay ? res.data.verification_status.replay : '',
                    city:res.data.most_predicated_area.city ? res.data.most_predicated_area.city : '',
                    area:res.data.most_predicated_area.area ? res.data.most_predicated_area.area : '',
                    pin_code: res.data.most_predicated_area.pin_code ? res.data.most_predicated_area.pin_code : 0,
                    visibility: res.data.visibility ? res.data.visibility : false
                 })
                }catch(e){
                console.log(e.message);
            }
        }
        getdiseaseid()
    },[id,profile._id,role,profile])

    useEffect(()=>{
        const getaccount = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/profile/${diseaseInfo.doctor_id}`);
                setDoctor({
                    name: res.data.name ? res.data.name : '',
                    email:res.data.email ? res.data.email : ''
                });
            }catch(e){
                console.log(e.message);
            }
        }
        getaccount()
    },[diseaseInfo.doctor_id]);

    useEffect(()=>{
        const geteduction = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/doctor/${diseaseInfo.doctor_id}`);
                setDoctorEduction({
                    contact_no:res.data.contact_no ? res.data.contact_no : '',
                    degree: res.data.Education_Detailes.degree ? res.data.Education_Detailes.degree : ''
                });
            }catch(e){
                console.log(e.message);
            }
        }
        geteduction()
    },[diseaseInfo.doctor_id]);

  return (
      <>
          <i style={{color: '#008aff', fontSize: '22px', cursor: 'pointer'}} className={icon} onClick={()=> {
            setPopup(true);
            }}></i>
        <Modal  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            show={popup}
        >
            <Modal.Header closeButton onHide={()=> setPopup(false)}>
                <Modal.Title style={{color:'#008aff', fontWeight:700}}> {`Disease Detailes ${role}`}</Modal.Title>
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
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Detailes</p>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={diseaseInfo.desease_name}
                                placeholder="name@example.com"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    setDiseaseInfo({...diseaseInfo,'desease_name':value});
                                }}
                                />
                                <label htmlFor="floatingInputCustom">Disease Name</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={diseaseInfo.image}
                                placeholder="name@example.com"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    setDiseaseInfo({...diseaseInfo,'image':value});
                                }}
                                />
                                <label htmlFor="floatingInputCustom">Disease Image</label>
                            </Form.Floating>
                            <a href={diseaseInfo.image} target='_blank'  rel='noopener noreferrer'><Button style={{ backgroundColor: '#008aff',
                            fontFamily: `Poppins, sans-serif`,
                            fontWeight:'500'}} >View Disease Image</Button></a>
                        </Col>
                        <Col xl={12} className="mt-2">
                            <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                type='text'
                                value={diseaseInfo.description}
                                as="textarea"
                                onChange={
                                    (e)=>{
                                        setDiseaseInfo({...diseaseInfo, description : e.target.value})
                                    }
                                }
                                placeholder="Description"
                                style={{ height: '150px' }}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Symptoms</p>
                    </Row>
                    <Row>
                        {
                            diseaseInfo.symptoms.length !==0
                            ?
                            diseaseInfo.symptoms.map((symptom,index) => (
                                <p  key={index}><span><i style={{color:'#008aff'}} className="fas fa-hand-point-right"></i></span>  {symptom}</p>
                            ))
                            :
                            <p className="text-danger text-center" style={{fontWeight:'600'}}>Symptoms Detailes Not Mentioned !</p>
                        }
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Precaution</p>
                    </Row>
                    <Row>
                        {
                            diseaseInfo.precaution.length !==0
                            ?
                            diseaseInfo.precaution.map((precaution,index) => (
                                <p  key={index}><span><i style={{color:'#008aff'}} className="fas fa-hand-point-right"></i></span>  {precaution}</p>
                            ))
                            :
                            <p className="text-danger text-center" style={{fontWeight:'600'}}>Precaution Detailes Not Mentioned !</p>
                        }
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Medicine</p>
                    </Row>
                    <Row>
                        {
                            diseaseInfo.medicine.length !==0
                            ?
                            diseaseInfo.medicine.map((medicine,index) => (
                                <p  key={index}><span><i style={{color:'#008aff'}} className="fas fa-hand-point-right"></i></span>  {medicine}</p>
                            ))
                            :
                            <p className="text-danger text-center" style={{fontWeight:'600'}}>Medicine Detailes Not Mentioned !</p>
                        }
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Vaccine</p>
                    </Row>
                    <Row>
                        {
                            diseaseInfo.vaccine.length !==0
                            ?
                            diseaseInfo.vaccine.map((vaccine,index) => (
                                <p  key={index}><span><i style={{color:'#008aff'}} className="fas fa-hand-point-right"></i></span>  {vaccine}</p>
                            ))
                            :
                            <p className="text-danger text-center" style={{fontWeight:'600'}}>Vaccine Detailes Not Mentioned !</p>
                        }
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Most Predicated Area</p>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='number'
                                value={diseaseInfo.pin_code}
                                placeholder="name@example.com"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    setDiseaseInfo({...diseaseInfo,'pin_code':value});
                                }}
                                />
                                <label htmlFor="floatingInputCustom">Pin Code</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={12}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={diseaseInfo.city}
                                placeholder="name@example.com"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    setDiseaseInfo({...diseaseInfo,'city':value});
                                }}
                                />
                                <label htmlFor="floatingInputCustom">City</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={12}>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={diseaseInfo.area}
                                placeholder="name@example.com"
                                onChange={(e)=>{
                                    const value = e.target.value
                                    setDiseaseInfo({...diseaseInfo,'area':value});
                                }}
                                />
                                <label htmlFor="floatingInputCustom">Area</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Verification Status</p>
                    </Row>
                    <Row className="align-items-center">
                        <Col xl={6}>
                            <Form.Floating className="mb-3">
                                <Form.Select onChange={
                                    (e)=>{
                                        const sta = e.target.value;
                                        if(sta === 'false'){
                                            setDiseaseInfo({...diseaseInfo, status: false})
                                        }else{
                                            setDiseaseInfo({...diseaseInfo, status: true})
                                        }
                                    }
                                }>
                                    <option value={diseaseInfo.status}>{diseaseInfo.status ? 'Verified' : 'Pending'}</option>
                                    <option value="false">Panding</option>
                                    <option value="true">Verified</option>
                                </Form.Select>
                                <label htmlFor="floatingInputCustom">Status</label>
                            </Form.Floating>
                        </Col>
                        <Col xl={6}>
                            <p>&nbsp;<b>Verification Date :</b> <span><Moment format='DD MMMM YYYY' date={diseaseInfo.verify_date} /></span></p>
                        </Col>
                        <Col xl={12} className="mt-2">
                            <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Replay">
                                <Form.Control
                                type='text'
                                value={diseaseInfo.replay}
                                as="textarea"
                                onChange={
                                    (e)=>{
                                        setDiseaseInfo({...diseaseInfo, replay : e.target.value})
                                    }
                                }
                                placeholder="Replay"
                                style={{ height: '150px' }}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Disease Visibility Status</p>
                    </Row>
                    <Row className="align-items-center">
                        <Col xl={12}>
                            <Form.Floating className="mb-3">
                                <Form.Select onChange={
                                    (e)=>{
                                        const sta = e.target.value;
                                        if(sta === 'false'){
                                            setDiseaseInfo({...diseaseInfo, visibility: false})
                                        }else{
                                            setDiseaseInfo({...diseaseInfo, visibility: true})
                                        }
                                    }
                                }>
                                    <option value={diseaseInfo.visibility}>{diseaseInfo.visibility ? 'Visibale' : 'Not Visibale' }</option>
                                    <option value="false">Not Visibale</option>
                                    <option value="true">Visibale</option>
                                </Form.Select>
                                <label htmlFor="floatingInputCustom">Visibility Status</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <p style={{color:'#008aff', fontWeight: 500}}>Doctor Information</p>
                    </Row>
                    <Row>
                        <Col xl="6">
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctor.name}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Name</label>
                            </Form.Floating>
                        </Col>
                        <Col xl="6">
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctor.email}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Email Id</label>
                            </Form.Floating>
                        </Col>
                        <Col xl="6">
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctorEduction.contact_no}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Contact Number</label>
                            </Form.Floating>
                        </Col>
                        <Col xl="6">
                            <Form.Floating className="mb-3">
                                <Form.Control
                                type='text'
                                value={doctorEduction.degree}
                                placeholder="name@example.com"
                                />
                                <label htmlFor="floatingInputCustom">Doctor Education</label>
                            </Form.Floating>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button disabled={!diseaseInfo.replay} style={{ backgroundColor: '#008aff',
                    fontFamily: `Poppins, sans-serif`,
                    fontWeight:'500'}}  onClick={async()=>{
                            try{
                                setIsloading(true);
                                const res = await axios.put(`https://lifestylediseases.herokuapp.com/disease/${id}`,{
                                    desease_name: diseaseInfo.desease_name,
                                    detail:{
                                        image: diseaseInfo.image,
                                        description: diseaseInfo.description,
                                        symptoms:diseaseInfo.symptoms,
                                        precaution:diseaseInfo.precaution,
                                        medicine:diseaseInfo.medicine,
                                        vaccine:diseaseInfo.vaccine
                                    },
                                    verification_status:{
                                        status:diseaseInfo.status,
                                        verify_date: diseaseInfo.verify_date,
                                        replay: diseaseInfo.replay
                                    },
                                    most_predicated_area:{
                                        pin_code: diseaseInfo.pin_code,
                                        city: diseaseInfo.city,
                                        area: diseaseInfo.area,
                                    },
                                    visibility: diseaseInfo.visibility
                                });
                                setMessage(res.data.message);
                                setShow(true);
                                setIsloading(false);
                            }catch(e){
                                console.log(e.message);
                            }
                    }}>{loading ? 'Processing...' : `${role} Now`}</Button>
            </Modal.Footer>
        </Modal>
      </>
  );
}

export default DiseaseVerify;
