import React from 'react';
import './Style.css';
import { Switch,  Route } from 'react-router-dom';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import Login from './Pages/Account/Login';
import SignIn from './Pages/Account/SignIn';
import Dashboard from './Pages/Dashboard';
import AllContactDetailes from './Pages/DataShowTable/AllContactDetailes';
import AllDiseases from './Pages/DataShowTable/AllDiseases';
import AllDoctor from './Pages/DataShowTable/AllDoctor';
import AllFedbacks from './Pages/DataShowTable/AllFedbacks';
import AllQuection from './Pages/DataShowTable/AllQuection';
import AllUser from './Pages/DataShowTable/AllUser';
import Errore from './Pages/Error/Errore';
import { ProfileProvider } from './Pages/Account/Context.Provider';
import Profile from './Pages/Profile/Profile';
import Logout from './Pages/Account/Logout';
import AdminLogin from './Pages/Account/AdminLogin';
import SpecificDoctorDisease from './Pages/DataShowTable/SpecificDoctorDisease';
import AddDoctorProfile from './Pages/Profile/AddDoctorProfile';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <Route exact path="/">
            <NavBar path="/"/>
            <Dashboard/>
            <Footer/>
        </Route>
        <Route exact path="/signin">
            <NavBar path="/signin"/>
            <SignIn/>
            <Footer/>
        </Route>
        <Route exact path="/login">
          <NavBar path="/login"/>
          <Login/>
          <Footer/>
        </Route>
        <Route exact path="/adminlogin">
          <NavBar path="/adminlogin"/>
          <AdminLogin/>
          <Footer/>
        </Route>
        <Route exact path="/profile">
          <NavBar path="/profile"/>
          <Profile/>
          <Footer/>
        </Route>
        <Route exact path="/profile/register">
          <NavBar path="/profile/register"/>
          <AddDoctorProfile/>
          <Footer/>
        </Route>
        <Route exact path="/alluser">
          <NavBar path="/alluser"/>
          <AllUser/>
          <Footer/>
        </Route>
        <Route exact path="/alldoctors">
          <NavBar path="/alldoctors"/>
          <AllDoctor/>
          <Footer/>
        </Route>
        <Route exact path="/alldiseases">
            <NavBar path="/alldiseases"/>
            <AllDiseases/>
            <Footer/>
        </Route>
        <Route exact path="/doctordisease">
            <NavBar path="/doctordisease"/>
            <SpecificDoctorDisease/>
            <Footer/>
        </Route>
        <Route exact path="/allquections">
            <NavBar path="/allquections"/>
            <AllQuection/>
            <Footer/>
        </Route>
        <Route exact path="/allfeedbacks">
            <NavBar path="/allfeedbacks"/>
            <AllFedbacks/>
            <Footer/>
        </Route>
        <Route exact path="/allcontacts">
            <NavBar path="/allcontacts"/>
            <AllContactDetailes/>
            <Footer/>
        </Route>
        <Route path='/logout'>
          <Logout/>
        </Route>
        <Route>
          <Errore/>
        </Route>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
