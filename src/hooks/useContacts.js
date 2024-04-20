import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import AuthContext from '../store/authContext';


const useContacts = () => {
    const {accessKey,setContactList}=useContext(AuthContext)
    const { getTokenLocalStorage} =useContext(AuthContext)


    const getContactData= async()=>{
      getTokenLocalStorage()
      console.log("contPage ",accessKey)
        try{
        
    
          if (!accessKey) {
            throw new Error('Access token not found');
          }
    
          
          // Define request headers with the access token
          const headers = {
            'Authorization': `Bearer ${accessKey}`
          };
          console.log(headers)
      const res= await axios('http://localhost:5001/api/contacts',{headers});
          console.log(res);
          setContactList(res.data);
          console.log(res.data)
        }
    
        catch(error){
          console.error('Error:', error.message);
        }
      }
    
      useEffect(()=>{
        getContactData()
      },[])
    


  
}

export default useContacts
