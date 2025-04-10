export const initialStore = () => {
  return {
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "update_contacts":
      const { contacts } = action.payload;

      return {
        ...store,
        contacts: contacts,
      };

    case "delete_contact":
      const { id: deleteById } = action.payload;

      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== deleteById),
      };

    case "edit_contacts":
      const { contact, id } = action.payload;

      const updateContacts = store.contacts.map((cont) =>
        cont.id === id ? { ...cont, ...contact } : cont
      );

      return {
        ...store,
        contacts: updateContacts,
      };

    default:
      throw Error("Unknown action.");
  }
}
