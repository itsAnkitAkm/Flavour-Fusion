import axios from 'axios';
function getToken() {
  return sessionStorage.getItem('accessToken');
}

export function fetchCartItem() {
  const token = getToken();
  return axios.get('http://localhost:8000/api/v1/cart/get-cart',{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  );

}
export function addItem(item) {
  const token = getToken();

  return axios.post('http://localhost:8000/api/v1/cart/add-to-cart', item, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}
export function updateItem(id, item) {
  return axios.patch(`http://localhost:8080/cart/${id}`, item);
}

export function deleteItem(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`);
}

