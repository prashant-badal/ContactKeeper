// useAddContact.js
import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../store/authContext';
import toast from 'react-hot-toast';


const useAddContact = () => {
  const { accessKey, contactList, setContactList, getTokenLocalStorage } = useContext(AuthContext);

  useEffect(() => {
    // addContact(formData)
  }, []);

  const addContact = async (formData) => {
    try {
      // Ensure that the access key is available before making the request
    
      if (!accessKey) {
        throw new Error('Access token not found');
      }

      // Define request headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessKey}`
      };

      // Make the POST request to add the contact
      const response = await axios.post('http://localhost:5001/api/contacts', formData, { headers });

      // Assuming the response contains the added contact data
      console.log('Contact added:', response.data);
      console.log(contactList);

      // You can return any data from the addContact function if needed
      setContactList(prevData=>[...prevData ,response.data])
      console.log(contactList);
      // return response.data;
    
    } 
    catch (error) {
      
      // Handle any errors that occur during the POST request
      console.error('Error adding contact:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };

  // Return the addContact function from the custom hook
  return addContact;
};

export default useAddContact;
