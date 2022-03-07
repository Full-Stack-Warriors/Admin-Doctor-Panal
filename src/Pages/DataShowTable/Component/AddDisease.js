import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useProfile } from '../../Account/Context.Provider';

function AddDisease({role,icon}) {
    const [show, setShow] = useState(false);
    const {profile} = useProfile();
    const [message, setMessage] = useState('');
    const [popup, setPopup] = useState(false);
    const [loading, setIsloading] = useState(false);
    const [diseaseInfo, setDiseaseInfo] = useState({
        doctor_id: profile ? profile._id : '',
        desease_name: '',
        image:'',
        description:'',
        symptoms:[],
        precaution:[],
        medicine:[],
        vaccine:[],
        city:'',
        area:'',
    });

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
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button disabled={!diseaseInfo.doctor_id} style={{ backgroundColor: '#008aff',
                    fontFamily: `Poppins, sans-serif`,
                    fontWeight:'500'}}  onClick={async()=>{
                            try{
                                setIsloading(true);
                                const res = await axios.post('https://lifestylediseases.herokuapp.com/disease',{
                                    doctor_id : diseaseInfo.doctor_id,
                                    desease_name: diseaseInfo.desease_name,
                                    detail:{
                                        image: diseaseInfo.image,
                                        description: diseaseInfo.description,
                                        symptoms:diseaseInfo.symptoms,
                                        precaution:diseaseInfo.precaution,
                                        medicine:diseaseInfo.medicine,
                                        vaccine:diseaseInfo.vaccine
                                    },
                                    most_predicated_area:{
                                        pin_code: diseaseInfo.pin_code,
                                        city: diseaseInfo.city,
                                        area: diseaseInfo.area,
                                    }
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

export default AddDisease
