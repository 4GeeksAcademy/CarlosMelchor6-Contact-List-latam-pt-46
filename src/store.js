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
      const { id } = action.payload;

      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== id),
      };

    default:
      throw Error("Unknown action.");
  }
}
