import React, { createContext, useState, useEffect, ReactNode, FC, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextProps {
  userEmail: string;
  fetchData: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context as UserContextProps; // Type assertion to UserContextProps
};

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem("CamEmail");
      if (value !== null) {
        setUserEmail(value);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <UserContext.Provider value={{ userEmail, fetchData }}>
      {children}
    </UserContext.Provider>
  );
};
