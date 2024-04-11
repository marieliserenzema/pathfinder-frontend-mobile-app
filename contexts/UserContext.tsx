import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import UserModel from '../models/UserModel';

interface UserContextProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
  createUser: (username: string, email: string, password: string) => void;
  isConnect: () => boolean;
  logout: () => void;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    favorites: [],
  } as UserModel);
  const [token, setToken] = useState('');

  const isConnect = () => {
    return token != '';
  }


  const createUser = (username: string, email: string, password: string) => {
    const newUser: UserModel = {
      _id: '1',
      username: username,
      email: email,
      password: password,
      role: 'user',
      favorites: []
    };
    setUser(newUser);
  };

  const deleteUser = () => {
    const emptyUser: UserModel = {
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
      favorites: []
    };
    setUser(emptyUser);
  };

  const logout = () => {
    setToken('');
    deleteUser();
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      createUser,
      isConnect,
      logout,
      token,
      setToken
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



