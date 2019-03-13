import parameters from "../../parameters";
import store from "../store";

class GrizzlystServerClient {

    constructor() {
        this.token = store.getState().userReducer.token || null;
    }

    post = async (endpoint, data, token = store.getState().userReducer.token) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
            console.log(error)
            return { status: false, data: error }
        }
    };

    get = async (endpoint, token = store.getState().userReducer.token) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
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

    delete = async (endpoint, token = store.getState().userReducer.token) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
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
