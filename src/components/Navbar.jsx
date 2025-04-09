import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container justify-content-end">
				<div className="row">

					<Link to="/AddContact">
						<button className="btn btn-success">Add new contact</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};