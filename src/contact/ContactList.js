// ContactList.js
import React, { useContext, useEffect, useState } from 'react';
import './ContactList.css'; // Import CSS file for styling
import AuthContext from '../store/authContext';
import useContacts from '../hooks/useContacts';
import useAddContact from '../hooks/useAddContact';
import { useNavigate } from "react-router-dom";
import useEdit from '../hooks/useEdit';
import useDelete from '../hooks/useDelete';

const ContactList = () => {
  const { contactList, setContactList } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editContactId, setEditContactId] = useState("");
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const UpdateContact = useEdit();
  const DeleteContact = useDelete();
  const { islogIn, removeAccessToken } = useContext(AuthContext);

  useContacts();
  const addContact = useAddContact();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(contactList); // Initialize with contactList

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Filter items based on the search term
    const results = contactList.filter(contact => contact.name.toLowerCase().includes(term.toLowerCase()));
    setSearchResults(results);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddContact = () => {
    addContact(formData);
    if (contactList) return;
  };

  const handleEditButton = (id) => {
    setEditable(true);
    setEditContactId(id);
  };

  const handleEditContact = () => {
    UpdateContact(editContactId, formData);
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };

  const handleDeleteContact = (id) => {
    DeleteContact(id);
  };

  const handleLogOut = () => {
    removeAccessToken();
    navigate('/');
  };

  return !searchResults && searchResults.length === 0 ? (<h1>Loading ...wait a while</h1>) : (<>
    <div className='bg'>
      <div className="contact-list-container">
        <h2>Contact List</h2>
        <button onClick={handleLogOut}> LogOut</button>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
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
            {searchResults.map(contact => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button onClick={() => handleEditButton(contact._id)}>Edit</button>
                  <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-contact-form">
          <h3>{editable ? 'Update Contact' : 'Add Contact'}</h3>
          {editable && `contactID :${editContactId}`}
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <button onClick={editable ? handleEditContact : handleAddContact}>{editable ? 'Update' : 'Add'}</button>
        </div>
      </div>
    </div>
  </>
  );
};

export default ContactList;
