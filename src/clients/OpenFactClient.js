class OpenFactClient {

    constructor() {
        let baseUrl = 'https://world.openfoodfacts.org/';
        this.searchUrl = baseUrl + 'cgi/search.pl?search_simple=1&action=process&json=1';
        this.productUrl = baseUrl + 'api/v/product/';
    }

    search = async (query) => {
        let url = `${this.searchUrl}&search_terms=${query}`;

        return this.get(url);
    };

    getProduct = async (code) => {
        let url = this.productUrl + code + '.json';
        
        return this.get(url);
    };
    
    get = async (url) => {
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

    normalizeProduct = (originalProduct) => {
        
    };

    normalizeProductPreview = (originalProducts) => {
        let products = [];

        for (let original of originalProducts) {
            let product = {
                code: original.code,
                brand: original.brands,
                name: original.product_name_fr,
                weight: original.quantity,
                nutrient_grade: original.nutrition_grade_fr,
                image: original.image_front_url,
            };
            products.push(product)
        }

        return products;
    };
}

const OpenClient = new OpenFactClient();

export default OpenClient;
