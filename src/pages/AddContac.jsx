// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const AddContac = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">

      <div className="row">
        {/* Map over the 'todos' array from the store and render each item as a list element */}

        <div className="col-12 mb-3">
          <label htmlFor="inputFullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="inputFullName" placeholder="Full Name" />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputPhone" className="form-label">Phone</label>
          <input type="num" className="form-control" id="inputPhone" placeholder="Enter phone" />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Enter address" />
        </div>

        <br />

        <Link to="/">
          <button className="col-12 btn btn-primary">Save</button>
        </Link>

      </div>
    </div>
  );
};
