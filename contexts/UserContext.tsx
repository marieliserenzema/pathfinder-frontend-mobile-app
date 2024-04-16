import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import UserModel from '../models/UserModel';
import client from '../client/client';
import HikeModel from '../models/HikeModel';

interface UserContextProps {
  user: UserModel | undefined;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
  setUserInfo: (token: string) => void;
  logout: () => void;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  favoriteHikes: HikeModel[];
  updateFavoriteHike: (hikeId: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [favoriteHikes, setFavoriteHikes] = useState<HikeModel[]>([]);


  const setUserInfo = async (token: string) => {
    const info: any = await client.getMeInfo(token);
    if (info) {
      const newUser: UserModel = {
        _id: info._id,
        username: info.username,
        email: info.email,
        password: info.password,
        favorite: info.favorite,
        role: info.role
      }
      setUser(newUser);
    }
  };

  useEffect(() => {
    if (token) {
      setUserInfo(token);
      fetchFavoriteHikes();
    } else {
      setUser(undefined)
    }
  }, [token]);


  const logout = () => {
    setUser(undefined)
    setFavoriteHikes([]);
    setToken(undefined);
  }

  const fetchFavoriteHikes = async () => {
    if (!token) return;
    const hikes = await client.getFavoriteHikes(token);
    setFavoriteHikes(hikes);
  }

  const updateFavoriteHike = async (hikeId: string) => {
    if (!token) return;
    const response = await client.updateFavoriteHike(token, hikeId);
    if (response) {
      fetchFavoriteHikes();
    }
  }



  return (
    <UserContext.Provider value={{
      user,
      setUser,
      setUserInfo,
      logout,
      token,
      setToken,
      favoriteHikes,
      updateFavoriteHike
    }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext doit être utilisé à l'intérieur de UserProvider");
  }
  return context;
};

export { UserContext, useUserContext, UserProvider };



