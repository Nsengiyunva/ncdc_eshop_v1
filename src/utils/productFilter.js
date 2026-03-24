export const ProductFilter = (productList) => {
	//filter products and return active ones only.
	var products = productList?.filter((product) => {
		return product.active === 1;
	});

	return products;
};
