import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, deleteUser } from "../services/fetchApi.js";

export const Contact = () => {

	const { store, dispatch } = useGlobalReducer()

	const handleContacts = async () => {
		const contacts = await getContacts()
		dispatch({ type: "update_contacts", payload: { contacts: contacts} })
	}

	const deleteContacts = async () => {
		const deleted = await deleteUser()
		if (deleted) {
			dispatch({ type: "update_contacts", payload: { contacts: []} })
		} else {
			alert("Hubo un error al eliminar los contactos")
		}
	}

	useEffect(() => {
		handleContacts()
	}, [])

	return (
		<div className="container mt-5">
			<div className="row">

				<button
					type="button"
					className="col-5 mx-auto btn btn-danger mb-2"
					onClick={deleteContacts}
				>
					Eliminar todos los contactos
				</button>
				
				<div className="col-9 mx-auto">
					<div className="card" >
						<ul className="list-group list-group-flush">
							{store.contacts.map((item, index) => {
								return (
									<li key={item.id} className="list-group-item">
										<div className="d-flex justify-content-between">
											<div className="d-flex gap-3">
												<div className="d-flex align-items-center">
													<img
														className="rounded-circle"
														style={{ width: "100px", height: "100px" }}
														src={`https://avatar.iran.liara.run/public/${item.id}`}
													/>
												</div>

												<div>
													<p className="fs-5">
														{item.name}
													</p>
													<p className="text-body-secondary">
														{item.email}<br />
														{item.address}<br />
														{item.phone}
													</p>
												</div>

											</div>

											<div className="d-flex gap-4">
												<i className="fa-solid fa-trash"></i>
												<i className="fa-solid fa-pen"></i>
											</div>

										</div>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}; 
