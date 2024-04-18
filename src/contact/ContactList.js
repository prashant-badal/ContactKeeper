// ContactList.js
import React, { useContext, useEffect, useState } from 'react';
import './ContactList.css'; // Import CSS file for styling
import AuthContext from '../store/authContext';
import axios from 'axios';

const ContactList = () => {
const {accessKey}=useContext(AuthContext)
  const [contacts, setContacts] = useState(null)
    // Add more contacts as needed

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: ''
  });

  const getContactData= async()=>{

    try{
    

      if (!accessKey) {
        throw new Error('Access token not found');
      }

      
      // Define request headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessKey}`
      };
  const res= await axios('http://localhost:5001/api/contacts',{headers});
      console.log(res.data);
      setContacts(res.data);
    }

    catch(error){
      console.error('Error:', error.message);
    }

      
  }

  useEffect(()=>{
    getContactData()
  },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddContact = () => {
    if (formData.id) {
      // Update existing contact
      setContacts(contacts.map(contact => (contact.id === formData.id ? formData : contact)));
    } else {
      // Add new contact
      const newContact = {
        id: Math.floor(Math.random() * 1000), // Generate a random ID (replace with server-generated ID in a real app)
        ...formData
      };
      setContacts([...contacts, newContact]);
    }
    setFormData({ id: null, name: '', email: '', phone: '' }); // Clear the form fields after adding or updating a contact
  };

  const handleEditContact = (contact) => {
    setFormData(contact);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };


  return !contacts ? (<h1>Loading ...wait a while</h1>) :(<>
  
  <div className='bg'>

    <div className="contact-list-container">
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleEditContact(contact)}>Edit</button>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-contact-form">
        <h3>{formData.id ? 'Update Contact' : 'Add Contact'}</h3>
        <input type="hidden" name="id" value={formData.id || ''} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <button onClick={handleAddContact}>{formData.id ? 'Update' : 'Add'}</button>
      </div>
    </div>
    
  </div>
  </>
  );
};

export default ContactList;
