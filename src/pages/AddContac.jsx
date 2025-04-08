// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { createContac, getContacts } from "../services/fetchApi.js";
import React, { useState } from "react";
import { object } from "prop-types";

export const AddContac = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" })

  const addContact = async () => {
    const created = await createContac(formData)
    if (created) {
      const contacts = await getContacts();
      dispatch({ type: "update_contacts", payload: { contacts: contacts } })
    }
  }

  return (
    <div className="container">

      <div className="row">

        <div className="col-12 mb-3">
          <label htmlFor="inputFullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="inputFullName"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
          />

        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputPhone" className="form-label">Phone</label>
          <input
            type="num"
            className="form-control"
            id="inputPhone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value })
            }}
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value })
            }}
          />
        </div>

        <br />

        <Link to="/">
          <button
            className="col-12 btn btn-primary"
            onClick={addContact}
          >
            Save
          </button>
        </Link>

        <Link to="/">
          <p>or get back to contacts</p>
        </Link>

      </div>
    </div>
  );
};
