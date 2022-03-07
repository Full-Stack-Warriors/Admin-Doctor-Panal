import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Alert, Container, Row, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useProfile } from '../Account/Context.Provider';
import Answer from './Component/Answer';

function AllQuection() {
    const [quection, setQuection] = useState([]);
    const [loading, setIsloading] = useState(true);
    const {profile,doctorProfile} = useProfile();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const History = useHistory();
    const doctorStatus = doctorProfile ? doctorProfile.verification_status.status : ''

    if(!profile){
        History.push('/alldiseases');
    }else if(!doctorProfile || doctorStatus === false){
        History.push('/profile');
    }

    useEffect(()=>{
        const quectionGet = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/quection');
                setQuection(res.data);
                setIsloading(false);
            }catch(e){
                console.log(e.message);
            }
        }
        quectionGet();
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
                <h3>Quection Detailes</h3>
                <p>All Quection Detailes Display Here</p>
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
                            <th width='3%'>#</th>
                            <th width='10%'>Name</th>
                            <th width='10%'>Disease Id</th>
                            <th width='10%'>Email Id</th>
                            <th width='15%'>Quection</th>
                            <th width='10%'>Asked Date</th>
                            <th width='17%'>Answer</th>
                            <th width='10%'>Answer Date</th>
                            <th width='10%'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quection.length !== 0
                            ?
                            quection.map((con, index) => (
                                <tr key={index}>
                                    <th>{index+1}</th>
                                    <td>{con.user_name}</td>
                                    <td>{con.disease_id}</td>
                                    <td>{con.user_email}</td>
                                    <td>{con.question}</td>
                                    <td>{<Moment format='DD MMMM YYYY' date={con.ask_date}/>}</td>
                                    <td>{con.answer === 'NA' ? <p>Not Answer</p> : con.answer}</td>
                                    <td><Moment format='DD MMMM YYYY' date={con.answer_date}/></td>
                                    <td>
                                        <Answer id={con._id}/>
                                        {" "}
                                        <i className="fas fa-trash" onClick={async ()=> {
                                            try{
                                                const res = await axios.delete(`https://lifestylediseases.herokuapp.com/quection/${con._id}`);
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
                                <td style={{textAlign:'center', fontWeight:'bold', color:'red'}} colSpan={9}>No Once Quection Detailes Found !</td>
                            </tr>
                        }   
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default AllQuection