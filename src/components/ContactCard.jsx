import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {

  const handleConfirmDelete = () => {
    const modalElement = document.getElementById("deleteContact" + contact.id);
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    onDelete(contact.id);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3">
          <div className="d-flex align-items-center">
            <img
              className="rounded-circle"
              style={{ width: "100px", height: "100px" }}
              src={`https://avatar.iran.liara.run/public/${contact.id}`}
              alt="avatar"
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
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                  Once executed, this action cannot be undone.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    OH no!
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmDelete}
                  >
                    Yes baby!
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Link to={"/EditContact/" + contact.id}>
            <i className="fa-solid fa-pen text-dark"></i>
          </Link>
        </div>
      </div>
    </li>
  );
};
