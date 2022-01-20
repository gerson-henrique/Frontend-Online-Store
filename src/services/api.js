export async function getCategories() {
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonResult = fetchCategories.json();
  return jsonResult;
}

export async function getProductsFromCategoryAndQuery(categoryID, searchID) {
  const fetchQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}&q=${searchID}`);
  const jsonQueryResult = fetchQuery.json();
  return jsonQueryResult;
}

export async function getProductsDetails(searchID) {
  const fetchQuery = await fetch(`https://api.mercadolibre.com/items/${searchID}`);
  const jsonQueryResult = fetchQuery.json();
  return jsonQueryResult;
}
