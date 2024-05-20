import axios from "axios";



export function fetchAllProducts(){
  return axios.get('http://localhost:8000/api/v1/food/foods');
}
export function fetchAllCategories(){
  return axios.get('http://localhost:8000/api/v1/category/categories');
}
export function fetchProductByCategories(categoryName,isVeg) {
  const queryString = `category=${encodeURIComponent(categoryName)}&pureVeg=${isVeg}`;
  return axios.get(`http://localhost:8000/api/v1/food/filter-food?${queryString}`);
}



