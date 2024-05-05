import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';
import toast from 'react-hot-toast';
import { server } from '../App';

const useUpdate = () => {
  const { setContactList, accessKey } = useContext(AuthContext);

  const updateContact = async (id, updatedData) => {
    try {
      if (!accessKey) {
        throw new Error('Access token not found');
      }

      // Define request headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessKey}`
      };

      console.log(id,updatedData)

      // Send PUT request to update contact
      const response = await axios.put(`${server}/api/contacts/${id}`, updatedData, { headers });

      console.log(response)

      // Update the contactList state with the updated contact data
      setContactList(prevContactList =>
        prevContactList.map(contact => (contact._id === id ? response.data : contact))
      );
      toast.success("Updated Successfully")
      
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return updateContact;
};

export default useUpdate;
