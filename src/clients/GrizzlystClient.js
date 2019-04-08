import parameters from "../../parameters";
import store from "../store";

class GrizzlystServerClient {
    constructor() {
        this.token = store.getState().userReducer.token;
    }

    /**
     * @param data
     *   - email
     *   - password
     */
    login = async (data) => {
        return await this.post('auth/login', data, false);
    };

    /**
     * @param data
     *   - email
     *   - firstname
     *   - lastname
     *   - pseudo
     *   - password
     *   - confirmPassword
     */
    signup = async (data) => {
        return await this.post('auth/signup', data, false);
    };

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
     * Add a department to a list.
     *
     * @param listId
     * @param departmentId
     */
    addDepartment = async (listId, departmentId) => {
        return await this.post(`lists/${listId}/department`, {departmentId})
    };

    /**
     * Return all departments objects.
     */
    getAllDepartments = async () => {
        return await this.get('departments');
    };

    /**
     * Update a product.
     *
     * @param listId
     * @param productId
     * @param data
     *   Object, can be quantity, state, departmentId
     */
    updateProduct = async (listId, productId, data) => {
        return await this.put(`lists/${listId}/product/${productId}`, data);
    };

    /**
     * Remove a product of a list.
     *
     * @param listId
     * @param departmentId
     * @param productId
     */
    removeProduct = async (listId, departmentId, productId) => {
        return await this.delete(`lists/${listId}/department/${departmentId}/product/${productId}`);
    };

    post = async (endpoint, data, needAuthorization = true) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': needAuthorization ? `Bearer ${this.getToken()}` : '',
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

    put = async (endpoint, data, needAuthorization = true) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': needAuthorization ? `Bearer ${this.getToken()}` : '',
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

    put = async (endpoint, data, token = store.getState().userReducer.token) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`,
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

    /**
     * Get the token currently store on Redux.
     *
     * @return string
     */
    getToken = () => {
        return store.getState().userReducer.token;
    };
}

const GrizzlystClient = new GrizzlystServerClient();

export default GrizzlystClient;
