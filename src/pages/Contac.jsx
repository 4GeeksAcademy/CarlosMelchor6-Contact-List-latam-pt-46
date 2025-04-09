import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {
  getContacts,
  deleteUser,
  deleteContact,
} from "../services/fetchApi.js";
import { Link } from "react-router-dom";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleContacts = async () => {
    const contacts = await getContacts();
    dispatch({ type: "update_contacts", payload: { contacts: contacts } });
  };

  const deleteContacts = async () => {
    const deleted = await deleteUser();
    if (deleted) {
      dispatch({ type: "update_contacts", payload: { contacts: [] } });
    } else {
      alert("Hubo un error al eliminar los contactos");
    }
  };

  const deleteContactById = async (id) => {
    const deleted = await deleteContact(id);
    if (deleted) {
      dispatch({ type: "delete_contact", payload: { id } });
    } else {
      alert("Hubo un error al eliminar contacto");
    }
  };

  const handleDelete = (id) => {
    const modalElement = document.getElementById("deleteContact" + id);
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    deleteContactById(id);
  };

  useEffect(() => {
    handleContacts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <button
          type="button"
          className="col-5 mx-auto btn btn-danger mb-2"
          onClick={deleteContacts}
        >
          Delete all users
        </button>

        <div className="col-9 mx-auto">
          <div className="card">
            <ul className="list-group list-group-flush">
              {store.contacts.map((contact) => {
                return (
                  <li key={contact.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-3">
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle"
                            style={{ width: "100px", height: "100px" }}
                            src={`https://avatar.iran.liara.run/public/`}
                          />
                        </div>

                        <div>
                          <p className="fs-5">{contact.name}</p>
                          <p className="text-body-secondary">
                            {contact.email}
                            <br />
                            {contact.address}
                            <br />
                            {contact.phone}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex gap-4">
                        <div>
                          <button
                            type="button"
                            style={{ border: "none", background: "none" }}
                            data-bs-toggle="modal"
                            data-bs-target={"#deleteContact" + contact.id}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>

                        <div
                          className="modal fade"
                          id={"deleteContact" + contact.id}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Are you sure?
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                once executed, this action cannot be undone
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  OH no!
                                </button>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleDelete(contact.id)}
                                  >
                                    Yes baby!
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Link to={"/EditContact/" + contact.id}>
                            <i className="fa-solid fa-pen text-dark"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
