import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, putContact } from "../services/fetchApi.js";
import React, { useState } from "react";
import { useEffect } from "react";
import { ContactForm } from "../components/ContactForm.jsx";

export const EditContact = () => {
  const { id } = useParams();
  const contactId = parseInt(id);
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (field, value) => {
    setContactData({ ...contactData, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.phone ||
      !contactData.address
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const updated = await putContact(contactId, contactData);
    if (updated) {
      dispatch({
        type: "edit_contacts",
        payload: { contact: contactData, id: contactId },
      });
      navigate("/");
      setError(null);
      alert("Successfully created user");
    }
  };

  useEffect(() => {
    const contactToEdit = store.contacts.find((contact) => contact.id === contactId);
    if (contactToEdit) {
      setContactData({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      });
    }
  }, [id, store.contacts]);

  return (
    <ContactForm
      title="Edit Contact"
      formData={contactData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
      buttonText="Save"
    />
  );
};
