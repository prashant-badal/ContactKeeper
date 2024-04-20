// ContactList.js
import React, { useContext, useEffect, useState } from 'react';
import './ContactList.css'; // Import CSS file for styling
import AuthContext from '../store/authContext';
import useContacts from '../hooks/useContacts';
import useAddContact from '../hooks/useAddContact';


const ContactList = () => {
  useContacts();
  const {addContact}=useAddContact()

const {contactList,setContactList}=useContext(AuthContext)


    // Add more contacts as needed

  const [formData, setFormData] = useState({
  
    name: '',
    email: '',
    phone: ''
  });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddContact = () => {
    addContact(formData);
  };

  const handleEditContact = (contactList) => {
    setFormData(contactList);
  };

  const handleDeleteContact = (id) => {
    setContactList(contactList.filter(contactList => contactList.id !== id));
  };


  return !contactList ? (<h1>Loading ...wait a while</h1>) :(<>
  
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
          {contactList.map(contact => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleEditContact(contactList)}>Edit</button>
                <button onClick={() => handleDeleteContact(contactList.id)}>Delete</button>
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
