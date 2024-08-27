import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventData } from "@/constants/Types";
import { getDocs, query, where } from "firebase/firestore";
import { EventRef } from "./firebase";

interface UserContextProps {
  userEmail: string;
  fetchData: () => Promise<void>;
  loading: boolean;
  filteredEvents: EventData[];
  allEvents: EventData[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getYourEvents: () => Promise<void>;
  getAllEvents: () => Promise<void>; // Added this line
}

const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context as UserContextProps;
};

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [allEvents, setAllEvents] = useState<EventData[]>([]);

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
      const q = query(EventRef, where("createdBy", "==", userEmail));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const events = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as EventData[];
        setFilteredEvents(events);
      } else {
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  const getAllEvents = async () => {
    setLoading(true);
    try {
      const verifiedEventsQuery = query(
        EventRef,
        where("isVerified", "==", true)
      );

      const response = await getDocs(verifiedEventsQuery);

      const eventData = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as EventData[];

      setAllEvents(eventData);
    } catch (error) {
      console.error("Error fetching verified events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    getYourEvents();
    getAllEvents();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userEmail,
        fetchData,
        filteredEvents,
        allEvents,
        loading,
        setLoading,
        getYourEvents,
        getAllEvents,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
