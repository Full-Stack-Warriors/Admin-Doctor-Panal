import React from 'react'
import { useHistory } from 'react-router';
import { useProfile } from './Context.Provider';

function AddDoctorProfile() {
    const {profile} = useProfile();
    const History = useHistory();
    if(!profile){
        History.push('/login');
    }
    
    return (
        <div>
            
        </div>
    )
}

export default AddDoctorProfile
