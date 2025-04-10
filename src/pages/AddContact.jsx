import {useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; 
import { createContac, getContacts } from "../services/fetchApi.js";
import React, { useState } from "react";
import { ContactForm } from "../components/ContactForm.jsx";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const created = await createContac(formData);
    if (created) {
      const contacts = await getContacts();
      dispatch({ type: "update_contacts", payload: { contacts } });

      navigate("/");
      setError(null);
      alert("Successfully created user");
    }
  };

  return (
    <ContactForm
      title="Create a new Contact"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
      buttonText="Save"
    />
  );
};
