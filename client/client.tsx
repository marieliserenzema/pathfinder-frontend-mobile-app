import { LatLng } from "react-native-maps";

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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const updateMeInfoWithoutPassword = async (
  token: string,
  username: string,
  email: string,
) => {
  try {
    const response = await fetch(
      "https://gorilla-honest-gull.ngrok-free.app/users",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      },
    );
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return true;
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const updateMeInfoWithPassword = async (
  token: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(
      "https://gorilla-honest-gull.ngrok-free.app/users",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    );
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const getHikeByLocation = async (token: string, location: string) => {
  try {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/hikes/?property=from&value=${encodeURIComponent(location)}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const updateFavoriteHike = async (token: string, hikeId: string) => {
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    const comments = await response.json();
    comments.sort((a: CommentModel, b: CommentModel) =>
      new Date(b.date) > new Date(a.date) ? 1 : -1,
    );
    return comments;
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const createComment = async (token: string, hikeId: string, text: string) => {
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
        }),
      },
    );
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
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
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const createAlert = async (
  token: string,
  userId: string,
  hikeId: string,
  description: string,
  coordinate: LatLng,
  photo?: string,
) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/alerts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        description,
        hikeId,
        coordinate,
        photo,
      }),
    });
    if (!response.ok) {
      return alert("Something went wrong : " + response.status);
    }
    return response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
  }
};

const getAllAlertsByHike = async (token: string, hikeId: string) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/alerts/hike/" + hikeId,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      //pas d'alertes en bases
      if (response.status === 404) {
        return [];
      } else {
        return alert("Something went wrong : " + response.status);
      }
    }
    return await response.json();
  } catch (error) {
    return alert("Something went wrong : " + error);
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
  createAlert,
  getAllAlertsByHike,
};
