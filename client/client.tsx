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

const getAllHikes = async (token: string) => {
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

const getHikeById = async (token: string, hikeId: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/hike/' + hikeId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const hike = await response.json();
      return hike;
    } else {
      console.error("Erreur lors de la requête:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

const getFavoriteHikes = async (token: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/user/favorite', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const favorite = await response.json();
      return favorite;
    } else {
      console.error("Erreur lors de la requête:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

const updateFavoriteHike = async (token: string, hikeId: string) => {
  console.log(token);
  try {
    const response = await fetch('http://127.0.0.1:3000/user/favorite', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favorite: hikeId
      }),
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Erreur lors de la requête:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return false;
  }
}



export default { login, register, getMeInfo, getAllHikes, getHikeById, updateFavoriteHike, getFavoriteHikes };