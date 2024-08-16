export interface EventData {
  id: string;
  createdAt: string;
  createdBy: string;
  date: string;
  description: string;
  eventName: string;
  images: string[];
  isVerified: boolean | string;
  location: string;
  time: string;
}
