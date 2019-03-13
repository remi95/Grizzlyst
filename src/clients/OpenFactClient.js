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
        let original = originalProduct.product;
        let product = {
            code: original.code,
            brand: original.brands,
            name: original.product_name_fr,
            weight: original.quantity,
            nutrient_grade: original.nutrition_grade_fr.toUpperCase(),
            image: original.image_url,
            description: original.generic_name_fr,
            nutriments: [
                {
                    name: 'Acides gras saturés',
                    value: original.nutriments['saturated-fat_100g'],
                    unit: original.nutriments['saturated-fat_unit'],
                },
                {
                    name: 'Matières grasses / Lipides',
                    value: original.nutriments.fat_100g || '-',
                    unit: original.nutriments.fat_unit || '',
                },
                {
                    name: 'Sucres',
                    value: original.nutriments.sugars_100g || '-',
                    unit: original.nutriments.sugars_unit || '',
                },
                {
                    name: 'Protéines',
                    value: original.nutriments.proteins_100g || '-',
                    unit: original.nutriments.proteins_unit || '',
                },
                {
                    name: 'Energie',
                    value: original.nutriments.energy_100g || '-',
                    unit: original.nutriments.energy_unit || '',
                },
                {
                    name: 'Sel',
                    value: original.nutriments.salt_100g || '-',
                    unit: original.nutriments.salt_unit || '',
                },
                {
                    name: 'Fibres',
                    value: original.nutriments.fiber_100g || '-',
                    unit: original.nutriments.fiber_unit || '',
                },
                {
                    name: 'Glucides',
                    value: original.nutriments.carbohydrates_100g || '-',
                    unit: original.nutriments.carbohydrates_unit || '',
                },
                {
                    name: 'Sodium',
                    value: original.nutriments.sodium_100g || '-',
                    unit: original.nutriments.sodium_unit || '',
                },
            ],
            ingredients: [],
            allergens: original.allergens_from_ingredients,
        };

        for (let ingredient of original.ingredients) {
            product.ingredients.push(ingredient.text.replace(/_/g, ''))
        }

        return product;
    };

    normalizeProductPreview = (originalProducts) => {
        let products = [];

        for (let original of originalProducts) {
            if (!original.product_name_fr) {
                continue;
            }

            let product = {
                code: original.code,
                brand: original.brands,
                name: original.product_name_fr,
                weight: original.quantity,
                nutrition_grade: original.nutrition_grade_fr,
                image_url: original.image_front_url,
                quantity: 1,
            };
            products.push(product)
        }

        return products;
    };
}

const OpenClient = new OpenFactClient();

export default OpenClient;
