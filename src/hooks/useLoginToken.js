import React, { useContext, useEffect } from 'react'
import AuthContext from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            console.log(accessKey)
            storeAccessToken(accessToken)
         
            console.log(accessKey)
            navigate('/contactList');
          } catch (error) {
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
