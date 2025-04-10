import React from "react";
import { Link } from "react-router-dom";

export const ContactForm = ({ title, formData, onChange, onSubmit, error, buttonText }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-3">
          <h1>{title}</h1>
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
            onChange={(e) => onChange("name", e.target.value)}
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
            onChange={(e) => onChange("email", e.target.value)}
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
            onChange={(e) => onChange("phone", e.target.value)}
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
            onChange={(e) => onChange("address", e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div>
          <button className="col-12 btn btn-primary" onClick={onSubmit}>
            {buttonText}
          </button>
        </div>

        <Link to="/">
          <p>or get back to contacts</p>
        </Link>
      </div>
    </div>
  );
};


