import CommentModel from "../models/CommentModel";

async function login(email: string, password: string) {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return error;
  }
}

const register = async (email: string, password: string, username: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const getMeInfo = async (token: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/users/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const user = await response.json();
      return user;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const updateMeInfoWithoutPassword = async (token: string, username: string, email: string) => {
  try {
    const response = await fetch("https://gorilla-honest-gull.ngrok-free.app/users", {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email
      })
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Erreur lors de la requête:", response);
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

const updateMeInfoWithPassword = async (token: string, username: string, email: string, password: string) => {
  try {
    const response = await fetch("https://gorilla-honest-gull.ngrok-free.app/users", {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });
    if (response.ok) {
      return true;

    } else {
      console.error("Erreur lors de la requête:", response.body);
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

const getAllHikes = async (token: string) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/hikes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const hikes = await response.json();
      return hikes;
    } else {
      console.error("AllHikes, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const getHikeById = async (token: string, hikeId: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/hikes/" + hikeId,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      const hike = await response.json();
      return hike;
    } else {
      console.error("HikeById, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const getHikeByLocation = async (token: string, location: string) => {
  try {

    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/hikes/?property=from&value=${encodeURIComponent(location)}`;
    const response = await fetch(
      apiUrl,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

      },
    );
    if (response.ok) {
      const hike = await response.json();
      return hike;
    } else {
      console.error("HikeByLocation, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const getFavoriteHikes = async (token: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/users/favorite",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      const favorite = await response.json();
      return favorite;
    } else {
      console.error("FavoriteHikes, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const updateFavoriteHike = async (token: string, hikeId: string) => {
  console.log(token);
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/users/favorite",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorite: hikeId,
        }),
      },
    );
    if (response.ok) {
      return true;
    } else {
      console.error("UpdateFavorite, erreur lors de la requête");
      return false;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return false;
  }
};

const getAllCommentsByHike = async (token: string, hikeId: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/comments/hike/" + hikeId,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      const comments = await response.json();
      comments.sort((a: CommentModel, b: CommentModel) =>
        new Date(b.date) > new Date(a.date) ? 1 : -1,
      );
      return comments;
    } else {
      console.error("AllComments, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const createComment = async (
  token: string,
  userId: string,
  hikeId: string,
  text: string,
) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/comments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          hikeId,
          userId,
        }),
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      console.error("New comment, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

const updateStars = async (token: string, hikeId: string, stars: number) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/hikes/" + hikeId,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stars,
        }),
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      console.error("Update stars, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

export default {
  login,
  register,
  getMeInfo,
  getAllHikes,
  getHikeById,
  updateFavoriteHike,
  getFavoriteHikes,
  getAllCommentsByHike,
  createComment,
  updateMeInfoWithoutPassword,
  updateMeInfoWithPassword,
  getHikeByLocation,
  updateStars,
};
