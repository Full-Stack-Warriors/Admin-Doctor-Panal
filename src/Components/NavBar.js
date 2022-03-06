import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useProfile } from '../Pages/Account/Context.Provider';

function NavigationBar({path}) {
  const History = useHistory();
  const BrowserPath = History.location.pathname;
  const { profile,doctorProfile } =  useProfile();
  const doctorStatus = doctorProfile ? doctorProfile.verification_status.status : ''
  const LINKS = !profile ?
   [
    { key: 8, to: '/signin' , text: 'SignUp' },
    { key: 9, to: '/login', text:  'LogIn' }
  ]
  :
    profile.role === 'doctor' 
    ?
      doctorStatus === true
      ?
      [
        { key: 4, to: '/doctordisease', text: 'Diseases' },
        { key: 5, to: '/allquections', text: 'Quections' },
      ]
      :
      [
        { key: 1, to: '/profile/register', text: 'Register' },
      ]
    :
    [
      { key: 0, to: '/', text: 'Dashboard' },
      { key: 1, to: '/alluser', text: 'Users' },
      { key: 3, to: '/alldoctors', text: 'Doctors' },
      { key: 4, to: '/alldiseases', text: 'Diseases' },
      { key: 5, to: '/allquections', text: 'Quections' },
      { key: 6, to: '/allfeedbacks', text: 'Feedbacks' },
      { key: 7, to: '/allcontacts', text: 'Contacts' }
    ]
  
  const DROPDOWN = [
    { key : 0, to: '/profile', text: 'Profile' },
    { key : 1, to: '/logout', text: 'LogOut' }
  ]
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg">
            <Container>
              <Link className="navbar-brand " to="/"><i className="fas fa-laptop-medical"></i> <span> E </span> Health Care</Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                <Nav>
                  {LINKS.map(item =>(
                    <Link key={item.key} className={item.to===BrowserPath ? 'nav-active nav-link' : 'nav-link'} to={item.to}>{item.text}</Link>
                   ))
                  }
                </Nav>
                {
                    profile
                    ?
                  <NavDropdown title={`🙏 ${profile ? profile.name : ''}`} id="basic-nav-dropdown">
                    {
                      DROPDOWN.map(menu =>(
                          <Link key={menu.key} className={menu.to===BrowserPath ? 'nav-active nav-link' : 'nav-link'} to={menu.to}>{menu.text}</Link>
                      ))
                    }
                  </NavDropdown>
                  :
                  ''
                }
                
              </Navbar.Collapse>
          </Container>
      </Navbar>
    )
}

export default NavigationBar