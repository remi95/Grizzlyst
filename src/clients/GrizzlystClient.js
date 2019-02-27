import parameters from "../../parameters";
import store from "../store";

class GrizzlystServerClient {

    constructor() {
        this.token = store.getState().userReducer.token || null;
    }

    post = async (endpoint, data) => {
        try {
            console.log(`${parameters.SERVER_URL}${endpoint}`)
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();

            if (!response.ok) {
                throw json;
            }

            return { status: true, data: json }
        }
        catch (error) {
            return { status: false, data: error }
        }
    };
}

const GrizzlystClient = new GrizzlystServerClient();

export default GrizzlystClient;
