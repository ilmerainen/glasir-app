import React from 'react';

const initContext = {
    products: { ...JSON.parse(localStorage.getItem('saveProducts')) },
    setProducts(newProducts) {
        this.products = newProducts;
    },
};

const BagContext = React.createContext(initContext);

export default BagContext;
