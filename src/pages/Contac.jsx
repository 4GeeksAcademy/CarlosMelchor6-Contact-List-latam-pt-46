import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts } from "../services/getContacts.js";

export const Contact = () => {

	const { store, dispatch } = useGlobalReducer()
	console.log(store.contacts);

	const handleContacts = async () => {
		const contacts = await getContacts()
		dispatch({ type: "get_contacts", payload: { contacts: contacts } })
	}

	useEffect(() => {
		handleContacts()
	}, [])

	return (
		<div className="container mt-5">
			<div className="row">
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
							})
							}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}; 