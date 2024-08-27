//contains data use by multiple screens
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
export const  campusEventCategories = [
  {
    key: 1,
    value: "Academic Event",
    icon: <MaterialIcons name="my-library-books" size={24} color="black" />,
  },
  {
    key: 2,
    value: "Cultural Event",
    icon: <Entypo name="hour-glass" size={24} color="black" />,
  },
  {
    key: 3,
    value: "Social Event",
    icon: <Ionicons name="people-circle-outline" size={24} color="black" />,
  },
  {
    key: 4,
    value: "Sports & Recreation Event",
    icon: <MaterialIcons name="sports-gymnastics" size={24} color="black" />,
  },
  {
    key: 5,
    value: "Career Event",
    icon: <MaterialIcons name="work-outline" size={24} color="black" />,
  },
  {
    key: 7,
    value: "Health & Wellness Event",
    icon: <MaterialIcons name="health-and-safety" size={24} color="black" />,
  },
  {
    key: 8,
    value: "Religious Event",
    icon: <MaterialIcons name="church" size={24} color="black" />,
  },
];

