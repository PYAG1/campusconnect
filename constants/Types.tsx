import { Point } from "react-native-google-places-autocomplete";

export interface EventData {
  eventID: number;
  createdAt: string;
  createdBy: string;
  date: string;
  description: string;
  eventName: string;
  images: ImageObject[] ;
  isVerified: boolean | string;
  location:MapData;
  category?:string,
  time: string;
  hostedBy?:string
}
export interface ImageObject {
  downloadURL: string;
  path: string;
}
export   interface MapData {
  description:string;
  MapDetails:Point | undefined
}
export interface CoordinateTypes{
  long:number | undefined;
  lat:number | undefined
}