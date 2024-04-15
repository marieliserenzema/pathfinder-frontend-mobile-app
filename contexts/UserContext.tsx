import React, { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import UserModel from '../models/UserModel';
import client from '../client/client';

interface UserContextProps {
  user: UserModel | undefined;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
  setUserInfo: (token: string) => void;
  logout: () => void;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  addToFavorite: (hikeId: string) => void;
  removeFromFavorite: (hikeId: string) => void;
  isFavorite: (hikeId: string) => boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [favorite, setFavorite] = useState<string[]>([]);


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
      if (user) setFavorite(user.favorite);
    } else {
      setUser(undefined)
    }
  }, [token]);

  const logout = () => {
    setUser(undefined)
    setFavorite([]);
    setToken(undefined);
  }

  const addToFavorite = (hikeId: string) => {
    setFavorite([...favorite, hikeId]);
  }

  const removeFromFavorite = (hikeId: string) => {
    setFavorite(favorite.filter(id => id !== hikeId));
  }

  const isFavorite = (hikeId: string) => {
    return favorite.includes(hikeId);
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      setUserInfo,
      logout,
      token,
      setToken,
      addToFavorite,
      isFavorite,
      removeFromFavorite
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



