let initialState = {
    departments: [
        {
            id: 123,
            name: 'Epicerie',
            products: [
                {
                    id: 1537,
                    brand: 'Nestlé',
                    name: 'Nesquik',
                    weight: '250g',
                    nutrient_grade: 'B',
                    image: 'https://static.openfoodfacts.org/images/products/303/371/006/5066/front_fr.48.400.jpg',
                    quantity: 2,
                    favorite: false,
                },
                {
                    id: 1557,
                    brand: 'Ferrero',
                    name: 'Nutella',
                    weight: '750g',
                    nutrient_grade: 'E',
                    image: 'https://static.openfoodfacts.org/images/products/301/762/042/1006/front_fr.112.100.jpg',
                    quantity: 1,
                    favorite: false,
                },
            ],
        },
        {
            id: 554,
            name: 'Boissons',
            products: [
                {
                    id: 2121,
                    brand: 'Auchan',
                    name: 'Orange pur jus',
                    weight: '1.5L',
                    nutrient_grade: 'C',
                    image: 'https://static.openfoodfacts.org/images/products/359/671/028/4542/front_fr.44.100.jpg',
                    quantity: 1,
                    favorite: true,
                },
                {
                    id: 4447,
                    brand: null,
                    name: 'Coca Cola',
                    weight: '1.5L',
                    nutrient_grade: 'E',
                    image: 'https://static.openfoodfacts.org/images/products/544/900/000/0439/front_fr.92.100.jpg',
                    quantity: 1,
                    favorite: false,
                },
            ],
        },
    ],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
      default:
          return state
  }
};

export default listReducer;