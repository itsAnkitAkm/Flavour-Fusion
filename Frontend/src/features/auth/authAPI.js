import axios from 'axios';
function storeToken(token) {
  sessionStorage.setItem('accessToken', token);
}

export function createUser(userInfo) {
  return axios.post('http://localhost:8000/api/v1/users/register', userInfo);
}


export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', loginInfo);
      const loginData = response.data.data.user;
      const accessToken=response.data.data.accessToken;
      storeToken(accessToken);
      resolve(loginData); // Resolve with the loginData

    } catch (error) {
      reject({ message: error.message });
    }
  });
}

export function signOutUser(userId){
  return {data:'sucess'};
}



