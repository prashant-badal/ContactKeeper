import React, { useContext, useEffect } from 'react'
import AuthContext from '../store/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { server } from '../App';

const useSignUp = (formData) => {
    const navigate=useNavigate()
    // const {setErrorTextLogin} = useContext(AuthContext);
    const registerUser=async(formData)=>{
        try {
            const response = await axios.post(`${server}/api/user/register`, formData);
            navigate('/')
            toast.success("Sign up successful")
            console.log(response.data);

        }
        catch(error){
            toast.error(error.response?.data?.message)
          
        }
    }


    useEffect(()=>{
        registerUser(formData)
    },[])


  return registerUser
}

export default useSignUp
