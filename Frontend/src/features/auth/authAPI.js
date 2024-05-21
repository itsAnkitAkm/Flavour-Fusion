import axios from 'axios';
function storeToken(token) {
  sessionStorage.setItem('accessToken', token);
}
function getToken() {
  return sessionStorage.getItem('accessToken');
}

export function createUser(userInfo) {
  return axios.post('http://localhost:8000/api/v1/users/register', userInfo);
}


export function loginUser(loginInfo) {
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
export const checkUser = async (token) => {
  const response = await axios.get('http://localhost:8000/api/v1/users/current-user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data.data);
  return response; // Assuming the response contains user data if the token is valid
};

export const signOutUser = async () => {
  const token = getToken();
  console.log("First time token:", token);

  try {
    await axios.post(
      'http://localhost:8000/api/v1/users/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Second time token:", getToken());

    // Optionally clear the token from the local storage or cookies
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    return { data: 'success' };
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Logout failed");
  }
};




