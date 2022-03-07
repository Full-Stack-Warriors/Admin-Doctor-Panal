import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Alert, Container, Row, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useProfile } from '../Account/Context.Provider';

function AllFedbacks() {
    const [feedback, setFeedbacks] = useState([]);
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
        const feedbackGet = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/feedback');
                setFeedbacks(res.data);
                setIsloading(false);
            }catch(e){
                console.log(e.message);
            }
        }
        feedbackGet();
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
                <h3>Feedback Detailes</h3>
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
                            <th width='2%'>#</th>
                            <th width='10%'>User Id</th>
                            <th width='10%'>Disease Id</th>
                            <th width='10%'>Name</th>
                            <th width='15%'>Email Id</th>
                            <th width='17%'>Feedback</th>
                            <th width='10%'>Feedback Date</th>
                            <th width='10%'>Disease Status</th>
                            <th width='10%'>Visibility Status</th>
                            <th width='17%'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            feedback.length !== 0
                            ?
                            feedback.map((con, index) => (
                                <tr key={index}>
                                    <th>{index+1}</th>
                                    <td>{con.user_id}</td>
                                    <td>{con.disease_id}</td>
                                    <td>{con.name}</td>
                                    <td>{con.email}</td>
                                    <td>{con.feedback}</td>
                                    <td>{<Moment format='DD MMMM YYYY' date={con.feedback_date}/>}</td>
                                    <td>{con.status ? <p>Approved</p> : <p>Pending</p> }</td>
                                    <td>{con.visibility ? <p>Approved</p> : <p>Pending</p> }</td>
                                    <td>
                                        <i style={{color:'#008aff', fontSize: '20px', cursor: 'pointer'}} className="fas fa-low-vision" onClick={async ()=> {
                                            try{
                                                setIsloading(true);
                                               const resReplay = await axios.put(`https://lifestylediseases.herokuapp.com/feedback/${con._id}`,{
                                                    status: true
                                               });
                                               setMessage(resReplay.data.message);
                                               setShow(true);
                                               setIsloading(false);
                                            }catch(e){
                                                console.log(e.message);
                                            }
                                        }}></i>
                                        {" "}
                                        <i style={{color:'#008aff', fontSize: '20px', cursor: 'pointer'}} className="fad fa-browser" onClick={async ()=> {
                                            try{
                                                setIsloading(true);
                                               const resReplay = await axios.put(`https://lifestylediseases.herokuapp.com/feedback/${con._id}`,{
                                                    visibility: true
                                               });
                                               setMessage(resReplay.data.message);
                                               setShow(true);
                                               setIsloading(false);
                                            }catch(e){
                                                console.log(e.message);
                                            }
                                        }}></i>
                                        {" "}
                                        <i className="fas fa-trash" onClick={async ()=> {
                                            try{
                                                const res = await axios.delete(`https://lifestylediseases.herokuapp.com/feedback/${con._id}`);
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
                                <td style={{textAlign:'center', fontWeight:'bold', color:'red'}} colSpan={10}>No Once Feedbacks Detailes Found !</td>
                            </tr>
                        }   
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default AllFedbacks
