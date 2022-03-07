import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Container, Row, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useProfile } from '../Account/Context.Provider';
import DoctorVerify from './Component/DoctorVerify';

function AllDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setIsloading] = useState(true);
    const {profile} = useProfile();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const History = useHistory();

    if(!profile){
        History.push('/login');
    }else if(profile.role === 'doctor'){
        History.push('/');
    }

    useEffect(()=>{
        const doctorGet = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/alldoctor');
                setDoctors(res.data);
                setIsloading(false);
            }catch(e){
                console.log(e.message);
            }
        }
        doctorGet();
    },[]);
    
    if(loading){
        return(
            <Container style={{height:"100vh"}}className="d-flex justify-content-center align-items-center">
                <Row >
                        <Spinner animation="grow" variant="info" />
                </Row>
            </Container>
        )
    }
    return (
        <Container className="table_detailes mt-4">
            <Row className="table_heading">
                <h3>All Doctors</h3>
                <p>All Doctors Detailes Display Here</p>
            </Row>
                { 
                    show 
                    ?
                    <Alert variant="info" onClose={() => {
                        setShow(false);
                        History.push('/');
                    }
                    } dismissible>
                    <p className='text-center'>{message}</p>
                    </Alert>
                    :
                    ''
                }
            <Row className="data_table mt-2">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th width='10%'>#</th>
                            <th width='20%'>Name</th>
                            <th width='20%'>Email Id</th>
                            <th width='20%'>Address</th>
                            <th width='20%'>Join Date</th>
                            <th width='10%'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.length !== 0
                            ?
                            doctors.map((us, index) => (
                                <tr key={index}>
                                    <th width='10%'>{index+1}</th>
                                    <td width ='20%'>{us.name}</td>
                                    <td width ="20%">{us.email}</td>
                                    <td width = '20%'><b>City :</b> {us.address.city}, <b>Area :</b> {us.address.area}, <b>PinCode :</b> {us.address.pin_code}</td>
                                    <td width ="10%">{<Moment format='DD MMMM YYYY' date={us.crteatedAt}/>}</td>
                                    <td width = "20%" style={{textAlign: 'center'}}>
                                        <DoctorVerify id={us._id}/>
                                        {" "}
                                        <i className="fas fa-trash" onClick={async ()=> {
                                            try{
                                                const res = await axios.delete(`https://lifestylediseases.herokuapp.com/profile/${us._id}`);
                                                setMessage(res.data.message);
                                                setShow(true);
                                            }catch(e){
                                                console.log(e.message);
                                            }
                                        }}></i>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td style={{textAlign:'center', fontWeight:'bold', color:'red'}} colSpan={9}>No Once Doctor Detailes Found !</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default AllDoctor
