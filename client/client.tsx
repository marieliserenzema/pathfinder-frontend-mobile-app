import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

async function login(email: string, password: string) {
  try {
    const response = await fetch('http://127.0.0.1:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};


const register = async (email: string, password: string, username: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};


const getMeInfo = async (token: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      console.error("Erreur lors de la requête:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const getHikes = async (token: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/hike', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const hikes = await response.json();
      return hikes;
    } else {
      console.error("Erreur lors de la requête:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}



export default { login, register, getMeInfo, getHikes };