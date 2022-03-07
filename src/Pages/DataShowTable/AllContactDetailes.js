import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Alert, Container, Row, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useProfile } from '../Account/Context.Provider';
import Replay from './Component/Replay';

function AllContactDetailes() {
    const [contact, setContact] = useState([]);
    const [loading, setIsloading] = useState(true);
    const {profile} = useProfile();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const History = useHistory();

    if(!profile){
        History.push('/alldiseases');
    }

    if(profile.role === 'doctor'){
        History.push('/alldiseases');
    }
   
    useEffect(()=>{
        const contactGet = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/contact');
                setContact(res.data);
                setIsloading(false);
            }catch(e){
                console.log(e.message);
            }
        }
        contactGet();
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
                <h3>Contact Detailes</h3>
                <p>All Contact Detailes Display Here</p>
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
                            <th width='10%'>Email Id</th>
                            <th width='15%'>Subject</th>
                            <th width='17%'>Message</th>
                            <th width='10%'>Contact Date</th>
                            <th width='17%'>Replay</th>
                            <th width='10%'>Replay Date</th>
                            <th width='10%'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contact.length !== 0
                            ?
                            contact.map((con, index) => (
                                <tr key={index}>
                                    <th>{index+1}</th>
                                    <td>{con.name}</td>
                                    <td>{con.email}</td>
                                    <td>{con.subject}</td>
                                    <td>{con.message}</td>
                                    <td>{<Moment format='DD MMMM YYYY' date={con.contact_date}/>}</td>
                                    <td>{con.answer === 'NA' ? <p>NA</p> : con.answer}</td>
                                    <td>{con.answer_date === 'NA' ? <p>NA</p> : <Moment format='DD MMMM YYYY' date={con.answer_date}/>}</td>
                                    <td>
                                        <Replay id={con._id}/>
                                        {" "}
                                        <i className="fas fa-trash" onClick={async ()=> {
                                            try{
                                                const res = await axios.delete(`https://lifestylediseases.herokuapp.com/contact/${con._id}`);
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
                                <td style={{textAlign:'center', fontWeight:'bold', color:'red'}} colSpan={9}>No Once Contact Detailes Found !</td>
                            </tr>
                        }   
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default AllContactDetailes
