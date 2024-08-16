import React, { createContext, useState, useEffect, ReactNode, FC, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventData } from "@/constants/Types";
import { getDocs, query, where } from "firebase/firestore";
import { EventRef } from "./firebase";

interface UserContextProps {
  userEmail: string;
  fetchData: () => Promise<void>;
  loading:boolean;
  filteredEvents:EventData[]
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
  getYourEvents: () => Promise<void>
  
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
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
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

  const getYourEvents = async () => {
    try {
      setLoading(true);
      const q = query(EventRef, where('createdBy', '==', userEmail));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const events = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EventData[];
        setFilteredEvents(events);
      } else {
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
  fetchData()
getYourEvents()
},[])
  return (
    <UserContext.Provider value={{ userEmail, fetchData,filteredEvents,loading,setLoading,getYourEvents }}>
      {children}
    </UserContext.Provider>
  );
};
