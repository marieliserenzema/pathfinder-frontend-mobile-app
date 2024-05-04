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
    } else {
      console.error("Login, erreur lors de la requête");
      return null;
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
    } else {
      console.error("Register, erreur lors de la requête");
      return null;
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
    } else {
      console.error("GetMe, erreur lors de la requête");
      return null;
    }
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
};

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
  updateStars,
};
