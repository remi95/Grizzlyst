import parameters from "../../parameters";
import store from "../store";

class GrizzlystServerClient {

    constructor() {
        this.token = store.getState().userReducer.token || null;
    }

    /**
     * Add product to a list, on a specific department.
     *
     * @param listId
     * @param departmentId
     * @param data
     *   - _id:      int
     *   - quantity: int
     */
    addProduct = async (listId, departmentId, data) => {
        return await this.post(`lists/${listId}/department/${departmentId}/product`, data);
    };

    /**
     * Return all departments objects.
     */
    getAllDepartments = async () => {
        return await this.get('departments');
    };

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
    }
}

const GrizzlystClient = new GrizzlystServerClient();

export default GrizzlystClient;
