import parameters from "../../parameters";
import store from "../store";

class GrizzlystServerClient {

    constructor() {
        this.token = store.getState().userReducer.token || null;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
        };
    }

    post = async (endpoint, data) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'POST',
                headers: this.headers,
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

    get = async (endpoint) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'GET',
                headers: this.headers
            });

            return await response.json();
        }
        catch (e) {
            return e;
        }
    }
}

const GrizzlystClient = new GrizzlystServerClient();

export default GrizzlystClient;
