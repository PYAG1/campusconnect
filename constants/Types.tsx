export interface EventData {
  eventID: number;
  createdAt: string;
  createdBy: string;
  date: string;
  description: string;
  eventName: string;
  images: ImageObject[] ;
  isVerified: boolean | string;
  location: string;
  time: string;
}
export interface ImageObject {
  downloadURL: string;
  path: string;
}