import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useProfile } from '../Account/Context.Provider'

function Dashboard() {
    const History = useHistory();
    const {profile} = useProfile();
    const [userAll,setUserAll] = useState([]);
    const [doctorAll, setDoctorAll]= useState([]);
    const [diseaseAll, setDiseaseAll]= useState([]);
    const [veriDisease, setVerifiedDisease]= useState([]);
    const [quectionAll, setQuectionAll]= useState([]);
    const [feedbackAll, setFeedbackAll]= useState([]);
    const [contactsAll, setcontactAll]= useState([]);

    // ==============If Admin Is Not Login===========
    if(!profile){
        History.push('/login');
    }else if(profile.role === 'doctor'){
        History.push('/allquections');
    }

    // ===========All Data Featch from MongoDb Database===========
    useEffect(()=>{
        const totalUser = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/allusers');
                setUserAll(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        totalUser();
    },[]);

    useEffect(()=>{
        const veriDoctor = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/alldoctor');
                setDoctorAll(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        veriDoctor();
    },[]);
    useEffect(()=>{
        const disease = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/alldisease');
                setDiseaseAll(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        disease();
    },[]);
    useEffect(()=>{
        const diseaseveri = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/alldiseaseverify');
                setVerifiedDisease(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        diseaseveri();
    },[]);
    useEffect(()=>{
        const Quections = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/quection');
                setQuectionAll(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        Quections();
    },[]);
    useEffect(()=>{
        const feedback = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/feedback');
                setFeedbackAll(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        feedback();
    },[]);
    useEffect(()=>{
        const contact = async ()=>{
            try{
                const res = await axios.get('https://lifestylediseases.herokuapp.com/feedback');
                setcontactAll(res.data);
            }catch(e){
                console.log(e.message);
            }
        }
        contact();
    },[]);
   
    return (
        <Container className="dashboard mt-4">
            <Row className="justify-content-center">
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Users</h4>
                        <h2>{userAll.length <= 9 ? `0${userAll.length}` : userAll.length}</h2>
                    </div>
                </Col>
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Doctors</h4>
                        <h2>{doctorAll.length <= 9 ? `0${doctorAll.length}` : doctorAll.length}</h2>
                    </div>
                </Col>
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Disease</h4>
                        <h2>{diseaseAll.length <= 9 ? `0${diseaseAll.length}` : diseaseAll.length}</h2>
                    </div>
                </Col>
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Verified Disease</h4>
                        <h2>{veriDisease.length <= 9 ? `0${veriDisease.length}` : veriDisease.length}</h2>
                    </div>
                </Col>
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Quections</h4>
                        <h2>{quectionAll.length <= 9 ? `0${quectionAll.length}` : quectionAll.length}</h2>
                    </div>
                </Col>
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Feedbacks</h4>
                        <h2>{feedbackAll.length <= 9 ? `0${feedbackAll.length}` : feedbackAll.length}</h2>
                    </div>
                </Col>
                <Col xl={3} className="dashboard_card">
                    <div className="dashboard_card_body">
                        <h4>Total Contacts</h4>
                        <h2>{contactsAll.length <= 9 ? `0${contactsAll.length}` : contactsAll.length}</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
