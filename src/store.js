export const initialStore = () => {
  return {
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'update_contacts':

      const { contacts } = action.payload

      return {
        ...store,
        contacts: contacts
      };

    default:
      throw Error('Unknown action.');
  }
}
