import axios from 'axios';
import React , { useState , useEffect } from 'react'
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';

function EditProfile({id}) {
    const [modalShow, setModalShow] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(false);
    const [message, setMessage] = useState('');
    const [user,setUser] = useState({
        name: '',
        email: '',
        city:'',
        area: '',
        pin_code: ''
    });
    useEffect(()=>{
        const getDiseasesInfo = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/profile/${id}`);
                setUser({
                    name: res.data.name ? res.data.name : '',
                    email: res.data.email ? res.data.email : '',
                    city: res.data.address.city ? res.data.address.city : '',
                    area:  res.data.address.area ? res.data.address.area : '',
                    pin_code:  res.data.address.pin_code ? res.data.address.pin_code : ''
                });
             }catch(e){
                 console.log(e.message);
             }
        }
        getDiseasesInfo();
        return ()=>{
           setUser([]);
        }
    },[id]);

    const PROFILE = [
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
            name:'city',
            value:user.city,
            type:'text',
            text:'Enter Your City Name'
        },
        {
            name:'area',
            value:user.area,
            type:'text',
            text:'Enter Your Area'
        },
        {
            name:'pin_code',
            value:user.pin_code,
            type:'number',
            text:'Enter Your Area Pin Code'
        }
    ]
    let name, value;
    const inputHandler = (e)=>{
        name = e.target.name;
        value= e.target.value;
        setUser({...user, [name]:value});
    }

    const updateProfile = async (e)=>{
        e.preventDefault();
        try{
            setloading(true);
            const profileSend = await axios.put(`https://lifestylediseases.herokuapp.com/profile/${id}`,{
                name: user.name,
                email: user.email,
                address:{
                    city: user.city,
                    area: user.area,
                    pin_code: user.pin_code,
                }
            })
            setloading(false);
            setMessage(profileSend.data.message);
            setShow(true);
        }catch(e){
            setloading(true)
            console.log(e.message);
            setMessage(e.message);
            setloading(false);
        }
    }

    return (
        <>
        <Button className="add_Profile"  onClick={() => setModalShow(true)}>Edit Profile</Button>
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={() => setModalShow(false)}>
                <Modal.Title style={{color:'#008aff', fontWeight:700}} id="contained-modal-title-vcenter">
                    Edit Your Profile
                </Modal.Title>
            </Modal.Header>
            { 
                show ?
                    <Alert variant="info" onClose={() => {
                            setShow(false);
                        }
                    } dismissible>
                        <p className='text-center'>{message}</p>
                    </Alert>
                    :
                    ''
            }
            <Modal.Body>
                <Form className="account_form_body mt-2">
                    {PROFILE.map(item =>(
                        <Row key={item.name}>
                            <Col xl={12}>
                                { 
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
                    fontWeight:'500'}} disabled={!user.email} onClick={updateProfile}>{loading ? 'Updateing...' : 'Update Profile'}</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}


export default EditProfile