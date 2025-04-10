import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {
  getContacts,
  deleteUser,
  deleteContact,
} from "../services/fetchApi.js";

export const useContacts = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadContacts = async () => {
    const contacts = await getContacts();
    dispatch({ type: "update_contacts", payload: { contacts: contacts } });
  };

  const deleteAllContacts = async () => {
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

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts: store.contacts,
    loadContacts,
    deleteAllContacts,
    deleteContactById
  }
};
