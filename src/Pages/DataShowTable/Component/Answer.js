import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useProfile } from '../../Account/Context.Provider';

function Answer({id}) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [popup, setPopup] = useState(false);
    const [loading, setIsloading] = useState(false);
    const {profile} = useProfile();
    const [replay,setReplay] = useState({
        name: '' ,
        email:'' ,
        quection:'',
        answer: ''
    });
      
    useEffect(()=>{
        const getid = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/quection/${id}`);
                setReplay({
                    name: res.data.user_name ? res.data.user_name : '' ,
                    email:res.data.user_email ? res.data.user_email : '',
                    quection:res.data.question ? res.data.question : '',
                    answer: res.data.answer ? res.data.answer : ''
                })
            }catch(e){
                console.log(e.message);
            }
        }
        getid()
    },[id])
    const REPLAY = [
        {
            name:'name',
            value:replay.name,
            type:'text',
            text:'Name'
        },
        {
            name:'email',
            value:replay.email,
            type:'email',
            text:'Email Id'
        },
        {
            name:'quection',
            value:replay.quection,
            type:'text',
            text:'Quection'
        },
        {
            name:'answer',
            value:replay.answer,
            type:'text',
            text:'Enter Answer',
        }
    ]
    let name, value;
    const inputHandler = (e)=>{
        name = e.target.name;
        value= e.target.value;
        setReplay({...replay, [name]:value});
    }
  return (
      <>
      <i className="fas fa-reply" onClick={()=> {
            setPopup(true);
        }}></i>
        <Modal  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            show={popup}
        >
            <Modal.Header closeButton onHide={()=> setPopup(false)}>
                <Modal.Title style={{color:'#008aff', fontWeight:700}}>Replay To Conatct</Modal.Title>
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
            <Modal.Body>
                <Form className="account_form_body mt-2">
                    {REPLAY.map(item =>(
                        <Row key={item.text}>
                            <Col xl={12}>
                                { 
                                    item.name === 'answer' ?
                                        <FloatingLabel className="mb-3" controlId="floatingTextarea2" label={item.text}>
                                            <Form.Control
                                            name={item.name}
                                            type={item.type}
                                            value={item.value}
                                            onChange={inputHandler}
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{ height: '150px' }}
                                            />
                                        </FloatingLabel>
                                    :
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
                                }
                            </Col>
                        </Row>
                        ))
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <Button style={{ backgroundColor: '#008aff',
                    fontFamily: `Poppins, sans-serif`,
                    fontWeight:'500'}} disabled={!replay.answer} onClick={async()=>{
                        try{
                            setIsloading(true);
                           const resReplay = await axios.put(`https://lifestylediseases.herokuapp.com/quection/${id}`,{
                                user_name: replay.name, 
                                user_email: replay.email, 
                                question:replay.quection, 
                                answer: replay.quection, 
                                doctor_id: profile._id,
                                answer_date: new Date()
                           });
                           setMessage(resReplay.data.message);
                           setShow(true);
                           setIsloading(false);
                        }catch(e){
                            console.log(e.message);
                        }
                    }}>{loading ? 'Processing...' : 'Replay Now'}</Button>
            </Modal.Footer>
        </Modal>
      </>
  );
}

export default Answer;
