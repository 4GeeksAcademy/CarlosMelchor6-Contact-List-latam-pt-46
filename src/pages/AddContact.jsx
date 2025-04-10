// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // Custom hook for accessing the global state.
import { createContac, getContacts } from "../services/fetchApi.js";
import React, { useState } from "react";

export const AddContact = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const addContact = async () => {
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
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-3">
          <h1>Add a new contact</h1>
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="inputFullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFullName"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputPhone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPhone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
          />
        </div>

        <br />

        <div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="col-12 btn btn-primary" onClick={addContact}>
            Save
          </button>
        </div>

        <Link to="/">
          <p>or get back to contacts</p>
        </Link>
      </div>
    </div>
  );
};
