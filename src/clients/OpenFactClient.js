class OpenFactClient {

    constructor() {
        this.searchUrl = 'https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1'
    }

    search = async (query) => {
        let url = `${this.searchUrl}&search_terms=${query}`;

        try {
            const response = await fetch(url);
            const json = await response.json();

            if (response.status !== 200) {
                throw json;
            }

            return { status: true, data: json}
        }
        catch (error) {
            return { status: false, data: error }
        }
    };

    normalizeProductPreview = (originalProducts) => {
        let products = [];

        for (let original of originalProducts) {
            let product = {
                brand: original.brands,
                name: original.product_name_fr,
                weight: original.quantity,
                nutrient_grade: original.nutrition_grade_fr,
                image: original.image_front_url,
            }
            products.push(product)
        }

        return products;
    };
}

const OpenClient = new OpenFactClient();

export default OpenClient;