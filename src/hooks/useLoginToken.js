import React, { useContext, useEffect } from 'react'
import AuthContext from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const useLoginToken = (formData) => {
    const { accessKey,storeAccessToken} = useContext(AuthContext);
    const {setErrorTextLogin} = useContext(AuthContext);
    const navigate = useNavigate();

    const getTokenData=async(formData)=>{
        try {
            const response = await axios.post('/api/user/login', formData);
            console.log(response);
            console.log(accessKey);
            const { accessToken } = response.data;
            console.log(accessToken);
            console.log("working ...here")

            storeAccessToken(accessToken)
            toast.success(response?.data?.message)
         
            console.log(accessKey)
            navigate('/contactList');
          } catch (error) {
            toast.error(error.response?.data?.message)
            setErrorTextLogin(error.response?.data?.message);
          }

    }

    useEffect(()=>{
        getTokenData(formData)
      },[])
      // Return getTokenData function directly
    return getTokenData;
 
}

export default useLoginToken
