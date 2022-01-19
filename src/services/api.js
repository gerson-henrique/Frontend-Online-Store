export async function getCategories() {
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonResult = fetchCategories.json();
  return jsonResult;
}

export async function getProductsFromCategoryAndQuery(searchID) {
  const fetchQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchID}`);
  const jsonQueryResult = fetchQuery.json();
  return jsonQueryResult;
}
