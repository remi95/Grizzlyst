import parameters from "../../parameters";

class GrizzlystServerClient {

    register = async (data) => {
        try {
            const response = await fetch(`${parameters.SERVER_URL}auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
    }
    

}

const GrizzlystClient = new GrizzlystServerClient();

export default GrizzlystClient;
