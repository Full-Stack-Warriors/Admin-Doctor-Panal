import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useProfile } from '../Account/Context.Provider';
import AddDisease from './Component/AddDisease';
import DiseaseVerify from './Component/DiseaseVerify';

function SpecificDoctorDisease() {
    const [diseases, setDiseases] = useState([]);
    const {profile,doctorProfile} = useProfile();
    const [loading, setIsloading] = useState(true);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const doctorStatus = doctorProfile ? doctorProfile.verification_status.status : ''
    const History = useHistory();
    if(!profile){
        History.push('/login');
    }else if(profile.role === 'admin'){
        History.push('/');
    }else if(!doctorProfile || doctorStatus === false){
        History.push('/profile');
    }
    useEffect(()=>{
        const diseasesGet = async ()=>{
            try{
                const res = await axios.get(`https://lifestylediseases.herokuapp.com/alldisease/${profile._id}`);
                setDiseases(res.data);
                setIsloading(false);
            }catch(e){
                console.log(e.message);
            }
        }
        diseasesGet();
    },[profile._id]);
    
    if(loading){
        return(
            <Container style={{height:"100vh"}} className="d-flex justify-content-center align-items-center">
                <Row >
                        <Spinner animation="grow" variant="info" />
                </Row>
            </Container>
        )
    }
    return (
        <Container className="table_detailes mt-4">
            <Row className="table_heading">
                <h3>All Diseases</h3>
                <p>All Diseases Detailes Display Here</p>
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
            <Row className="text-center">
                <Col xl={12}>
                  <AddDisease role='Add' icon="fas fa-plus-circle"/>
                </Col>
            </Row>
            <Row className="data_table mt-2">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th width='5%'>#</th>
                            <th width='10%'>Disease Name</th>
                            <th width='30%'>Description</th>
                            <th width='10%'>Verification Status</th>
                            <th width='10%'>Visibility Status</th>
                            <th width='10%'>Added Date</th>
                            <th width='10%'>Approved Date</th>
                            <th width='15%'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            diseases.length !== 0
                            ?
                            diseases.map((us, index) => (
                                <tr key={index}>
                                    <th width='10%'>{index+1}</th>
                                    <td width ='20%'>{us.desease_name}</td>
                                    <td width ="20%">{us.detail.description !=='' ? `${us.detail.description.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, "")}...` : 'No description'}</td>
                                    <td>{us.verification_status.status ? <p>Approved</p> : <p>Pending</p> }</td>
                                    <td>{us.visibility ? <p>Approved</p> : <p>Pending</p> }</td>
                                    <td width ="10%">{<Moment format='DD MMMM YYYY' date={us.created_date}/>}</td>
                                    <td width ="10%">{<Moment format='DD MMMM YYYY' date={us.verification_status.verify_date}/>}</td>
                                    <td width = "20%" style={{textAlign: 'center'}}>
                                        <DiseaseVerify id={us._id} role="View" icon="fas fa-eye"/>
                                        {" "}
                                        <DiseaseVerify id={us._id} role="Edit" icon="fas fa-edit"/>
                                        {" "}
                                        <i className="fas fa-trash" onClick={async ()=> {
                                            try{
                                                const res = await axios.delete(`https://lifestylediseases.herokuapp.com/disease/${us._id}`);
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

export default SpecificDoctorDisease;
