import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import AuthContext from '../store/authContext';
import { server } from '../App';


const useContacts = () => {
    const {accessKey,contactList,setContactList}=useContext(AuthContext)
    const { getTokenLocalStorage} =useContext(AuthContext)


    const getContactData= async()=>{

        try{
        
    
          if (!accessKey) {
            throw new Error('Access token not found');
          }
    
          
          // Define request headers with the access token
          const headers = {
            'Authorization': `Bearer ${accessKey}`
          };
          console.log(headers)
      const res= await axios(`${server}/api/contacts`,{headers});
          console.log(contactList);
          setContactList(res.data);
          console.log(res.data)
          console.log(contactList);
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
