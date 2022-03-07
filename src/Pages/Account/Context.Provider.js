import axios from "axios";
import React,{ createContext, useState, useContext, useEffect } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({children})=>{
    const [profile,setProfile] = useState();
    const [doctorProfile, setDoctorProfile] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getRole = async ()=>{
        try{
            const res = await axios.get(`https://lifestylediseases.herokuapp.com/doctor/${profile._id}`);
            setDoctorProfile(res.data);
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        getRole();
    },[getRole])
       

    return <ProfileContext.Provider value={{profile,setProfile,doctorProfile,setDoctorProfile}}>{children}</ProfileContext.Provider>
}

export const useProfile = ()=> useContext(ProfileContext);