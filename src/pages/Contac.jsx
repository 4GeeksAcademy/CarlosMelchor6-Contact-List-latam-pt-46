import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard.jsx";
import { useContacts } from "../hooks/useContacts.jsx";

export const Contact = () => {
  
  const {
    contacts,
    deleteAllContacts,
    deleteContactById
  } = useContacts()

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 mb-3 d-flex justify-content-center ">
          <div className="w-75">
            <Link to="/AddContact">
              <button className="btn btn-success w-100">Add new contact</button>
            </Link>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-danger mb-3 w-75 "
            onClick={deleteAllContacts}
          >
            Delete all users
          </button>
        </div>

        <div className="col-9 mx-auto">
          <div className="card">
            <ul className="list-group list-group-flush">
              {contacts.map((contact) => {
                return (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onDelete={deleteContactById}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
