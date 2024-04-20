import axios from 'axios';
import React, { useContext ,useEffect} from 'react'
import AuthContext from '../store/authContext';

const useAddContact = (formData) => {
const { accessKey,getTokenLocalStorage} =useContext(AuthContext)


const addContact=async()=>{


    getTokenLocalStorage()
    console.log("contPage ",accessKey)
       
  
       
    try {
        if (!accessKey) {
            throw new Error('Access token not found');
          }
    
          
          // Define request headers with the access token
          const headers = {
            'Authorization': `Bearer ${accessKey}`
          };
        const response = await axios.post('http://localhost:5001/api/contacts', formData);
        // Assuming the response contains the added contact data
        console.log('Contact added:', response.data);
        // Clear the form after successful submission
        // setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
        // Handle any errors that occur during the POST request
        console.error('Error adding contact:', error);
    }
}


useEffect(()=>{
  addContact(formData)
  },[])

  return addContact
}

export default useAddContact
