import axios from 'axios';

function getToken() {
  return sessionStorage.getItem('accessToken');
}

export function createOrder(order) {
  const token = getToken();
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/order/create-order',
        order,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      resolve({ data: response.data });
    } catch (error) {
      console.error('Error creating order:', error);
      resolve({ error: error.message });
    }
  });
}


export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/'+order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
 let queryString = '';

 for (let key in sort) {
  queryString += `${key}=${sort[key]}&`;
}
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      'http://localhost:8080/orders?' + queryString
    );
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}