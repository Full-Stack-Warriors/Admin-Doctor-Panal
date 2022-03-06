import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
    const LINKS = [
        { to: 'https://ehealthcareforeveryone.netlify.app/', text: 'Home' },
        { to: 'https://ehealthcareforeveryone.netlify.app/about', text: 'About' },
        { to: 'https://ehealthcareforeveryone.netlify.app/contact', text: 'Contact' },
      ]
      const HELP = [
        { to: 'https://ehealthcareforeveryone.netlify.app/symptomschecker', text: 'Check Your Symptoms.' },
        { to: 'https://ehealthcareforeveryone.netlify.app/chat', text: 'Lets Clear Your Douts.' },
        { to: 'https://ehealthcareforeveryone.netlify.app//', text: 'What Pepole Says ?' },
        { to: 'https://ehealthcareforeveryone.netlify.app/about', text: 'Why Important This Platform?' },
      ]
    return (
        <>
        <Container fluid className="Footer mt-5">
            <Row>
                <Col xl={4} className="Footer_Logo">
                    <Link to="/"><i className="fas fa-laptop-medical"></i> <span> E </span> Health Care</Link>
                    <ul className="footer_social">
                        <li><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="/"><i className="fab fa-instagram"></i></Link></li>
                    </ul>
                </Col>
                <Col xl={4} className="Footer_Menu">
                    <p>Get To Know Us</p>
                    <ul>
                        {LINKS.map(item =>(
                            <li key={item.to}><a target='_blank' rel='noopener noreferrer' href={item.to}>{item.text}</a></li>
                            ))
                        }
                    </ul>
                </Col>
                <Col xl={4} className="Footer_Help">
                    <p>Let Us Help You</p>
                    <ul>
                        <li><a target='_blank' rel='noopener noreferrer' href="https://ehealthcareforeveryone.netlify.app/">Register As A User</a></li>
                        {HELP.map(item =>(
                            <li key={item.to}><a target='_blank' rel='noopener noreferrer' href={item.to}>{item.text}</a></li>
                            ))
                        }
                    </ul>
                </Col>
            </Row>
            <Row className="Developer">
                <Col xl={12}>
                        <p>&copy; 2021-22 ~ E HEALTH CARE, All Rights Reserved.</p>
                        <a target='_blank' rel='noopener noreferrer' href="https://github.com/Full-Stack-Warriors">Develped By ~ <span> <i className="fab fa-github"></i> BE Project Id 09.</span></a>
                </Col>
            </Row>
        </Container>
     </>
    )
}

export default Footer
