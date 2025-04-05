export const getContacts = async () => {
    try {
        const response = await fetch("https://playground.4geeks.com/contact/agendas/CarlosMelchor6", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const data = await response.json()

        if (!response.ok) {
            console.log("Hubo un error", response.status);
        }

        return data.contacts;

    } catch (error) {
        console.log("Error: ", error)
        return null;
    }
}