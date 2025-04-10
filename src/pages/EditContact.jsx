import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, putContact } from "../services/fetchApi.js";
import React, { useState } from "react";
import { useEffect } from "react";

export const EditContact = () => {
  const { id } = useParams();
  const contactId = parseInt(id);
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [contacData, setcontacData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const contactToEdit = store.contacts.find((c) => c.id === contactId);
    if (contactToEdit) {
      setcontacData({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      });
    }
  }, [id, store.contacts]);

  const navigate = useNavigate();

  const editContact = async () => {
    if (
      !contacData.name ||
      !contacData.email ||
      !contacData.phone ||
      !contacData.address
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const updated = await putContact(contactId, contacData);
    if (updated) {
      const contact = await getContacts();
      dispatch({
        type: "edit_contacts",
        payload: { contact: contacData, id: contactId },
      });
      navigate("/");
      setError(null);
      alert("Successfully created user");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-3">
          <h1>Edit a new contact</h1>
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
            value={contacData.name}
            onChange={(e) => {
              setcontacData({ ...contacData, name: e.target.value });
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
            value={contacData.email}
            onChange={(e) => {
              setcontacData({ ...contacData, email: e.target.value });
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
            value={contacData.phone}
            onChange={(e) => {
              setcontacData({ ...contacData, phone: e.target.value });
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
            value={contacData.address}
            onChange={(e) => {
              setcontacData({ ...contacData, address: e.target.value });
            }}
          />
        </div>

        <br />

        {error && <div className="alert alert-danger">{error}</div>}
        <div>
          <button className="col-12 btn btn-primary" onClick={editContact}>
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
