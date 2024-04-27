import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';
import toast from 'react-hot-toast';

const useDelete = () => {
  const { contactList, setContactList, accessKey } = useContext(AuthContext);

  const DeleteContact = async (id) => {
    try {
      if (!accessKey) {
        throw new Error('Access token not found');
      }

      // Define request headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessKey}`
      };

      // Send DELETE request to delete contact
      await axios.delete(`http://localhost:5001/api/contacts/${id}`, { headers });

      // Update the contactList state by filtering out the deleted contact
      setContactList(prevContactList => prevContactList.filter(contact => contact._id !== id));

      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error(error.message);
    }
  };

  return DeleteContact;
};

export default useDelete;
