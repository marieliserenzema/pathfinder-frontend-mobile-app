import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import UserModel from '../models/UserModel';

interface UserContextProps {
    user: UserModel;
    setUser: Dispatch<SetStateAction<UserModel>>;
    createUser: (userData: UserModel) => void;
    isConnect: () => boolean;
    logout: () => void;
    token: string;
    setToken : Dispatch<SetStateAction<string>>;
  }

const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({ children } : { children: React.ReactNode }){
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


    const createUser = (userData: UserModel) =>{
        userData._id = '1';
        userData.role = 'user';
        userData.username = '@usernumero1';
        setUser(userData);
        console.log('Utilisateur créé');    
    };

    const logout = () => {
      setToken('');
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
  
  
  
   